import { spawn } from 'child_process';
import * as path from 'path';

import { ExecutorContext } from '@nx/devkit';

import { TypecheckExecutorSchema } from './schema';

export default async function runExecutor(
    options: TypecheckExecutorSchema,
    context: ExecutorContext
) {
    const projectRoot = context.projectsConfigurations?.projects[context.projectName!]?.root;

    if (!projectRoot) {
        throw new Error(`Could not find project ${context.projectName}`);
    }

    const workspaceRoot = context.root;
    const fullProjectRoot = path.join(workspaceRoot, projectRoot);

    return new Promise<{ success: boolean }>((resolve, reject) => {
        const child = spawn('npx', ['react-router', 'typegen'], {
            cwd: fullProjectRoot,
            stdio: 'inherit',
            shell: true,
        });

        child.on('error', (error: any) => {
            console.error('Failed to run typecheck:', error);
            reject({ success: false });
        });

        child.on('exit', (code: any) => {
            if (code === 0) {
                // Now run tsc
                const tscChild = spawn('npx', ['tsc'], {
                    cwd: fullProjectRoot,
                    stdio: 'inherit',
                    shell: true,
                });

                tscChild.on('error', (error: any) => {
                    console.error('Failed to run tsc:', error);
                    reject({ success: false });
                });

                tscChild.on('exit', (tscCode: any) => {
                    if (tscCode === 0) {
                        console.log('Type checking completed successfully!');
                        resolve({ success: true });
                    } else {
                        console.error('Type checking failed');
                        reject({ success: false });
                    }
                });
            } else {
                console.error('Typegen failed');
                reject({ success: false });
            }
        });
    });
} 