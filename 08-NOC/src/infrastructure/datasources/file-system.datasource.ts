import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";


export class fileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.log';;
    private readonly mediumLogsPath = 'logs/logs-medium.log';;
    private readonly highLogsPath = 'logs/logs-high.log';;

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if ( !fs.existsSync( this.logPath ) ) {
            fs.mkdirSync( this.logPath );
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if ( fs.existsSync( path ) ) return;
            
            fs.writeFileSync( path, '' );
        })
    }

    async saveLog( newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify( newLog )}\n`;

        fs.appendFileSync( this.allLogsPath, logAsJson );

        if ( newLog.level === LogLevel.low ) return;
        if ( newLog.level === LogLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }
    }

    private getLogFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8' );
        const logs = content.split('\n').map( LogEntity.fromJSON);

        // const sdtringLogs = content.split('\n').map(
        //     log => LogEntity.fromJSON( log )
        // )

        return logs;
    }
    async getLog( severityLevel: LogLevel): Promise<LogEntity[]> {
        switch ( severityLevel ) {
            case LogLevel.low:
                return this.getLogFromFile( this.allLogsPath );
            case LogLevel.medium:
                return this.getLogFromFile( this.mediumLogsPath );
            case LogLevel.high:
                return this.getLogFromFile( this.highLogsPath );
            default:
                throw new Error('Invalid severity level');
        }
    }

}