import * as path from 'path';

import {
    addProjectConfiguration, formatFiles, generateFiles, names, offsetFromRoot, Tree
} from '@nx/devkit';

import { CloudflareRouterAppGeneratorSchema } from './schema';

interface NormalizedSchema extends CloudflareRouterAppGeneratorSchema {
    projectName: string;
    projectRoot: string;
    projectDirectory: string;
    parsedTags: string[];
}

function normalizeOptions(
    tree: Tree,
    options: CloudflareRouterAppGeneratorSchema
): NormalizedSchema {
    const name = names(options.name).fileName;
    const projectDirectory = options.directory
        ? `${names(options.directory).fileName}/${name}`
        : name;
    const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const projectRoot = projectDirectory;
    const parsedTags = options.tags
        ? options.tags.split(',').map((s: string) => s.trim())
        : [];

    return {
        ...options,
        projectName,
        projectRoot,
        projectDirectory,
        parsedTags,
    };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
        template: '',
    };
    generateFiles(
        tree,
        path.join(__dirname, 'files'),
        options.projectRoot,
        templateOptions
    );
}

export async function cloudflareRouterAppGenerator(
    tree: Tree,
    options: CloudflareRouterAppGeneratorSchema
) {
    const normalizedOptions = normalizeOptions(tree, options);

    // Add project configuration
    addProjectConfiguration(tree, normalizedOptions.projectName, {
        root: normalizedOptions.projectRoot,
        projectType: 'application',
        sourceRoot: `${normalizedOptions.projectRoot}/app`,
        targets: {
            build: {
                executor: '@10xsai/cloudflare-router-nx-plugin:build',
                outputs: ['{options.outputPath}'],
                options: {
                    outputPath: `dist/${normalizedOptions.projectRoot}`,
                },
            },
            dev: {
                executor: '@10xsai/cloudflare-router-nx-plugin:dev',
                options: {
                    port: 3000,
                },
            },
            deploy: {
                executor: '@10xsai/cloudflare-router-nx-plugin:deploy',
                options: {
                    buildTarget: `${normalizedOptions.projectName}:build`,
                },
            },
            typecheck: {
                executor: '@10xsai/cloudflare-router-nx-plugin:typecheck',
                options: {},
            },
            typegen: {
                executor: '@10xsai/cloudflare-router-nx-plugin:typegen',
                options: {},
            },
            lint: {
                executor: '@nx/eslint:lint',
                outputs: ['{options.outputFile}'],
                options: {
                    lintFilePatterns: [
                        `${normalizedOptions.projectRoot}/**/*.{ts,tsx,js,jsx}`,
                    ],
                },
            },
            ...(normalizedOptions.skipTests
                ? {}
                : {
                    test: {
                        executor: '@nx/vite:test',
                        outputs: ['{options.reportsDirectory}'],
                        options: {
                            passWithNoTests: true,
                            reportsDirectory: `coverage/${normalizedOptions.projectRoot}`,
                        },
                    },
                }),
        },
        tags: normalizedOptions.parsedTags,
    });

    addFiles(tree, normalizedOptions);
    await formatFiles(tree);
}

export default cloudflareRouterAppGenerator;
export const cloudflareRouterAppSchematic = cloudflareRouterAppGenerator;