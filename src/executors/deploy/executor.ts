import { spawn } from 'child_process';
import * as path from 'path';

import { ExecutorContext } from '@nx/devkit';

import { DeployExecutorSchema } from './schema';

export default async function runExecutor(
    options: DeployExecutorSchema,
    context: ExecutorContext
) {
    const projectRoot = context.projectsConfigurations?.projects[context.projectName!]?.root;

    if (!projectRoot) {
        throw new Error(`Could not find project ${context.projectName}`);
    }

    const workspaceRoot = context.root;
    const fullProjectRoot = path.join(workspaceRoot, projectRoot);

    // Build the project first
    console.log('Building project before deployment...');
    const buildResult = await new Promise<boolean>((resolve) => {
        const buildChild = spawn('npx', ['nx', 'build', context.projectName!], {
            cwd: workspaceRoot,
            stdio: 'inherit',
            shell: true,
        });

        buildChild.on('exit', (code) => {
            resolve(code === 0);
        });
    });

    if (!buildResult) {
        throw new Error('Build failed');
    }

    // Deploy to Cloudflare Workers
    console.log(`Deploying to Cloudflare Workers (${options.environment || 'production'})...`);

    return new Promise<{ success: boolean }>((resolve, reject) => {
        const deployArgs = ['wrangler', 'deploy'];

        if (options.environment && options.environment !== 'production') {
            deployArgs.push('--env', options.environment);
        }

        const child = spawn('npx', deployArgs, {
            cwd: fullProjectRoot,
            stdio: 'inherit',
            shell: true,
        });

        child.on('error', (error: any) => {
            console.error('Failed to deploy:', error);
            reject({ success: false });
        });

        child.on('exit', (code: any) => {
            if (code === 0) {
                console.log('Deployment completed successfully!');
                resolve({ success: true });
            } else {
                console.error('Deployment failed');
                reject({ success: false });
            }
        });
    });
} 