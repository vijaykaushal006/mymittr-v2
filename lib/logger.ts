type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
    private log(level: LogLevel, message: string, meta?: any) {
        const timestamp = new Date().toISOString();
        const logData = {
            timestamp,
            level,
            message,
            ...meta,
        };

        switch (level) {
            case 'info':
                console.log(JSON.stringify(logData));
                break;
            case 'warn':
                console.warn(JSON.stringify(logData));
                break;
            case 'error':
                console.error(JSON.stringify(logData));
                break;
            case 'debug':
                if (process.env.NODE_ENV === 'development') {
                    console.debug(JSON.stringify(logData));
                }
                break;
        }
    }

    info(message: string, meta?: any) {
        this.log('info', message, meta);
    }

    warn(message: string, meta?: any) {
        this.log('warn', message, meta);
    }

    error(message: string, meta?: any) {
        this.log('error', message, meta);
    }

    debug(message: string, meta?: any) {
        this.log('debug', message, meta);
    }
}

export const logger = new Logger();
