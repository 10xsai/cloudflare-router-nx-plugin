export interface CloudflareRouterAppGeneratorSchema {
    name: string;
    directory?: string;
    projectNameAndRootFormat?: 'as-provided' | 'derived';
    tags?: string;
    style: 'css' | 'tailwind';
    skipTests?: boolean;
    skipPackageJson?: boolean;
} 