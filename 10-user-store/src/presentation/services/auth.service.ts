import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {
    constructor() {}

    public async registerUser( registerDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne({ email: registerDto.email });
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel( registerDto );

            //* Encriptacion
            user.password = bcryptAdapter.hash( registerDto.password );

            await user.save();

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

      return {
        user: userEntity,
        token: 'ABC'
      };
    }

}