import { LogEntity, LogLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface checkServiceUseCase {
    execute( url:string ):Promise<boolean>;
}

type SuccessCallback = ( () => void) | undefined;
type FailureCallback = (( error:string ) => void) | undefined;

export class checkService implements checkServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly failureCallback: FailureCallback 
    ) {}

    public async execute( url:string ):Promise<boolean> {

        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error('Service is down');
            }
            const log = new LogEntity(`Service ${url} is OK`, LogLevel.low);
            this.logRepository.saveLog( log );
            this.successCallback && this.successCallback();
            
            return true;
        } catch (error) {
            const errorMensage = `${ url } - ${ error }`;
            const log = new LogEntity( errorMensage, LogLevel.high );
            this.logRepository.saveLog( log );
            this.failureCallback && this.failureCallback( errorMensage );
            return false;
        }

    }
}