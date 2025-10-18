
export enum LogLevel {
   low      = 'low',
   medium   = 'medium',
   high     = 'high'
   
}

export interface LogEntityOptions {
    level: LogLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    public level: LogLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJSON = ( json: string):LogEntity => {
        const { level, message, createdAt, origin } = JSON.parse( json );
        
        if ( !level || !message || !createdAt ) {
            throw new Error('Invalid log JSON');
        }
        
        const log = new LogEntity({ 
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin,
         });

        return log;
    }
}