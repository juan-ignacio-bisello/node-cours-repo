

interface checkServiceUseCase {
    execute( url:string ):Promise<boolean>;
}

type SuccessCallback = ( ) => void;
type FailureCallback = ( error:string ) => void;

export class checkService implements checkServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly failureCallback: FailureCallback 
    ) {}

    public async execute( url:string ):Promise<boolean> {

        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error('Service is down');
            }
            this.successCallback();
            console.log(`${url} is OK`);
            return true;
        } catch (error) {
            this.failureCallback(`${ error }`);
            console.log(`${ error }`);
            return false;
        }

    }
}