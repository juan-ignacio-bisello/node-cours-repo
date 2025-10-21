import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";


const prismaClient = new PrismaClient();

const severityLevel = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {


    async saveLog(log: LogEntity): Promise<void> {

        const level = severityLevel[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        });

        console.log('PostgreSQL saved!');
    }


    async getLog( logLevel: LogLevel): Promise<LogEntity[]> {
        
        const level = severityLevel[logLevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        })

        return dbLogs.map( dblog => LogEntity.fromObject( dblog ) );
    }
    
}