import { LogEntity, LogLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from '../../domain/datasources/log.datasource';


export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly LogDatasource: LogDatasource
    ) {}
    
    async saveLog(log: LogEntity): Promise<void> {
        return this.LogDatasource.saveLog( log );
    }
    async getLog( severityLevel: LogLevel): Promise<LogEntity[]> {
        return this.LogDatasource.getLog( severityLevel );
    }
    
}