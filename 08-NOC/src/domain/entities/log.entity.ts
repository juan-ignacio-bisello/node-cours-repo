
export enum LogLevel {
   low      = 'low',
   medium   = 'medium',
   high     = 'high'
   
}

export class LogEntity {
    public level: LogLevel;
    public message: string;
    public createdAt: Date;

    constructor(
        message: string, 
        level: LogLevel = LogLevel.low,
        createdAt: Date = new Date()
    ) {
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
    }

    static fromJSON = ( json: string):LogEntity => {
        const { level, message, createdAt } = JSON.parse( json );
        
        if ( !level || !message || !createdAt ) {
            throw new Error('Invalid log JSON');
        }
        
        const log = new LogEntity( message, level);
        log.createdAt = new Date( createdAt );

        return log;
    }
}