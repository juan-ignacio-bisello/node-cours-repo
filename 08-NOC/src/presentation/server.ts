import { checkService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {

    public static start() {
        console.log('Server started...');

        CronService.createJob( 
            '*/5 * * * * *', 
            () => {
                const url = 'https://www.google.com';
                new checkService(
                    () => console.log(` ${ url } is ok!`),
                    (error) => console.log('Failure callback executed with error:', error)
                ).execute( url);
                // new checkService().execute( 'http://localhost:3000/posts');
            }
        );
    }
}