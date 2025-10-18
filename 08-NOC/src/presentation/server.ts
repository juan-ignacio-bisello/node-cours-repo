import { checkService } from "../domain/use-cases/checks/check-service";
import { fileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new fileSystemDatasource()
)


export class Server {

    public static start() {
        console.log('Server started...');

        const emailService = new EmailService();

        emailService.sendEmail({
            to: 'ignaciodxtree99@live.com.ar',
            subject: 'Test Email from Node.js NOC',
            htmlBody: `
                <h1>This is a test email sent from Node.js using Nodemailer!</h1>
                <p>Hello! This email confirms that the email service is working correctly.</p>
                `
        })
        // CronService.createJob( 
        //     '*/5 * * * * *', 
        //     () => {
        //         const url = 'https://www.google.com';
        //         // const url = 'http://localhost:3000/posts';
        //         new checkService(
        //             fileSystemLogRepository,
        //             undefined,
        //             undefined
        //         ).execute( url);
        //         // new checkService().execute( 'http://localhost:3000/posts');
        //     }
        // );
    }
}