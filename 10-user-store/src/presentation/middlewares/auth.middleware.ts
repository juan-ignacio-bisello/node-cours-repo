import { NextFunction, Request, Response } from 'express';
import { JWTAdapter } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';


export class AuthMiddleware {

    static async validateJwt( req: Request, res: Response, next: NextFunction ) {

        const authorization = req.header('Authorization');
        if ( !authorization ) return res.status(401).json({ error: 'No token provider' });
        if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid bearer token' });

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JWTAdapter.validateToken<{ id: string }>( token );
            if ( !payload ) return res.status(401).json({ error: 'Invalid token' });
            
            const user = await UserModel.findById( payload.id );
            if ( !user ) return res.status(401).json({ error: 'Invalidad token - user' });
            

            req.body.user = UserEntity.fromObject( user );

            next();

        } catch (error) {
            console.log( error );
            res.status(500).json({ errror: 'Internal server error'});
        }
    }
}