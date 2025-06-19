export interface DevExecutorSchema {
    buildTarget: string;
    port?: number;
    host?: string;
    open?: boolean;
    watch?: boolean;
} 