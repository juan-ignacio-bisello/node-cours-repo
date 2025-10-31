import { regularExps } from "../../../config";


export class RegisterUserDto {

    constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static create( obj: {[ key:string]:any } ): [string?, RegisterUserDto?] {
        const { name, email, password } = obj;

        if ( !name ) return ['Missing name', undefined ];
        if ( !email ) return ['Missing email', undefined ];
        if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if ( !password ) return ['Missing password', undefined ];
        if ( password.length < 6 ) return ['Password too short'];

        return [undefined, new RegisterUserDto( name, email, password )];
    }
}