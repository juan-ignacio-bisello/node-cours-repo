import { bcryptAdapter, envs, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";



export class AuthService {

    constructor(

        private readonly emailService: EmailService,
    ) {}

    public async registerUser( registerDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne({ email: registerDto.email });
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel( registerDto );

            //* Encriptacion
            user.password = bcryptAdapter.hash( registerDto.password );

            await user.save();

            if ( user.email )  await this.sendEmailValidationLink( user.email );

            const { password, ...userEntity} = UserEntity.fromObject( user );

            const token = await JWTAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error while creating jwt');

            return { 
                user: userEntity, 
                token: token
            };

        } catch (error) {
            throw CustomError.internalServer( `${ error }` );
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {

      if (!loginUserDto.email) throw CustomError.badRequest('Email is required');
      if (!loginUserDto.password) throw CustomError.badRequest('Password is required');

      const existUser = await UserModel.findOne({ email: loginUserDto.email });
      if (!existUser) throw CustomError.badRequest('Email not exist');

      const isMatch = bcryptAdapter.compare(loginUserDto.password, existUser.password!);
      if (!isMatch) throw CustomError.badRequest('Password not valid');

      const { password, ...userEntity } = UserEntity.fromObject(existUser);

      const token = await JWTAdapter.generateToken({ id: existUser.id });
      if ( !token ) throw CustomError.internalServer('Error while creating jwt');

      return {
        user: userEntity,
        token: token
      };
    }

    private sendEmailValidationLink = async( email: string ) => {

        const token = await JWTAdapter.generateToken({ email });
        if ( !token ) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${encodeURIComponent(String(token))}`;


        const html = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Validate your Email</h2>
            <p>Click the button below to validate your account:</p>
            <a href="${link}" 
               style="display: inline-block; background-color: #007BFF; color: white; 
                      padding: 10px 20px; border-radius: 5px; text-decoration: none;">
               Validate Email
            </a>
            <p>If the button doesn’t work, copy and paste this link in your browser:</p>
            <p>${link}</p>
          </div>
        `;


        const options = {
            to: email,
            subject: 'Validate your Email',
            htmlBody: html
        }

        const isSet = await this.emailService.sendEmail( options );
        if ( !isSet ) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public validateEmail = async( token: string ) => {
        const payload = await JWTAdapter.validateToken( token );
        if ( !payload ) throw CustomError.unauthorizedRequest('Invalid token');

        const { email } = payload as { email: string};
        if ( !email ) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if ( !user ) throw CustomError.internalServer('User not exists');

        user.emailValidated = true;
        await user.save();

        return true;
    }

}