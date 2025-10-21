import { MongoDataBase } from "../data/mongo";
import { LogLevel } from "../domain/entities/log.entity";
import { checkService } from "../domain/use-cases/checks/check-service";
import { checkServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { fileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fsLogRepository = new LogRepositoryImpl(
    // new fileSystemDatasource()
    new fileSystemDatasource(),
);

// const mongoRepository = new LogRepositoryImpl(
//     new MongoDataBase(),
// )

const postgreRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);
    
const emailService = new EmailService();


export class Server {

    public static async start() {
        console.log('Server started...');


        // const logs = LogRepository.getLog( LogLevel.low );
        // console.log( logs )


        // new SendEmailLogs(
        //     emailService, fileSystemLogRepository
        // ).execute(
        //     ['ignaciodxtree99@live.com.ar', 'juanignaciobisello@hotmail.com']
        // )

        // emailService.sendEmailWithFileSystemLogs(
        //     ['ignaciodxtree99@live.com.ar', 'juanignaciobisello@hotmail.com']
        // );
        CronService.createJob( 
            '*/5 * * * * *', 
            () => {
                const url = 'https://www.google.com';

                new checkServiceMultiple(
                    [ fsLogRepository, postgreRepository ],
                    undefined,
                    undefined
                ).execute( url);
                // new checkService().execute( 'http://localhost:3000/posts');
            }
        );
    }
}