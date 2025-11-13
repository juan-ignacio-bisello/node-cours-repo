import jwt, { Secret } from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;

export class JWTAdapter {


    static generateToken( payload: any, duration: number = 2 ) {

        return new Promise(( resolve ) => {
            jwt.sign( payload, JWT_SEED, { expiresIn: 60 * 60 * duration }, (err, token ) => {
                if ( err || !token ) return resolve( null );
                return resolve( token );
            }) 
        })

        
    }

    static validateToken( token: string ) {
        return new Promise( (resolve) => {
            jwt.verify( token, JWT_SEED, ( err, decoded ) => {
                if ( err ) return resolve(null);
                
                resolve( decoded );
            })
        })
    }
}