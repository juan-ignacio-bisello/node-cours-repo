import jwt, { Secret } from 'jsonwebtoken';


export class JWTAdapter {


    static generateToken( payload: any, duration: string = '2h' ) {

        return new Promise(( resolve ) => {
            const secret: Secret = "default_seed";
            jwt.sign( payload, secret, { expiresIn: 60 * 60 * 2 }, (err, token ) => {
                if ( err || !token ) return resolve( null );
                return resolve( token );
            }) 
        })

        
    }

    static validateToken( token: string ) {
        
        
        return ;
    }
}