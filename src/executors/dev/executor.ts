import { spawn } from 'child_process';
import * as path from 'path';

import { ExecutorContext } from '@nx/devkit';

import { DevExecutorSchema } from './schema';

export default async function runExecutor(
    options: DevExecutorSchema,
    context: ExecutorContext
) {
    const projectRoot = context.projectsConfigurations?.projects[context.projectName!]?.root;

    if (!projectRoot) {
        throw new Error(`Could not find project ${context.projectName}`);
    }

    const workspaceRoot = context.root;
    const fullProjectRoot = path.join(workspaceRoot, projectRoot);

    const args = ['react-router', 'dev'];

    if (options.port) {
        args.push('--port', options.port.toString());
    }

    return new Promise<{ success: boolean }>((resolve, reject) => {
        const child = spawn('npx', args, {
            cwd: fullProjectRoot,
            stdio: 'inherit',
            shell: true,
        });

        child.on('error', (error: any) => {
            console.error('Failed to start dev server:', error);
            reject({ success: false });
        });

        // Dev server runs indefinitely, so we don't wait for exit
        console.log('Development server started successfully!');

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            child.kill('SIGINT');
            resolve({ success: true });
        });

        process.on('SIGTERM', () => {
            child.kill('SIGTERM');
            resolve({ success: true });
        });
    });
} 