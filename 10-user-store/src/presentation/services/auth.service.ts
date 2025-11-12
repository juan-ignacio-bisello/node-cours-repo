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

            return { 
                user: userEntity, 
                token: 'abc'
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

        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ email }`;

        const html = `
            <h1>Validate your Email</h1>
            <p>click for validate</p>
            <a> link: ${ link } - email: ${ email } </a>
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

}