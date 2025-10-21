import { LogLevel } from "../domain/entities/log.entity";
import { checkService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { fileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const LogRepository = new LogRepositoryImpl(
    new fileSystemDatasource()
)
    
    const emailService = new EmailService();


export class Server {

    public static async start() {
        console.log('Server started...');


        const logs = LogRepository.getLog( LogLevel.low );
        console.log( logs )
        // new SendEmailLogs(
        //     emailService, fileSystemLogRepository
        // ).execute(
        //     ['ignaciodxtree99@live.com.ar', 'juanignaciobisello@hotmail.com']
        // )

        // emailService.sendEmailWithFileSystemLogs(
        //     ['ignaciodxtree99@live.com.ar', 'juanignaciobisello@hotmail.com']
        // );
        // CronService.createJob( 
        //     '*/5 * * * * *', 
        //     () => {
        //         const url = 'https://www.google.com';
        //         // const url = 'http://localhost:3000/posts';
        //         new checkService(
        //             LogRepository,
        //             undefined,
        //             undefined
        //         ).execute( url);
        //         // new checkService().execute( 'http://localhost:3000/posts');
        //     }
        // );
    }
}