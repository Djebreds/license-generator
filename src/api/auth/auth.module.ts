import { Global, Module } from '@nestjs/common';
import { ApiKeyService } from './services/api-key.service';
import { TokenService } from './services/token.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthMapper } from './mappers/auth.mapper';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';

@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: ['jwt'],
      session: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthMapper,
    AuthService,
    ApiKeyService,
    ApiKeyRepository,
    TokenService,
    PasswordService,
  ],
})
export class AuthModule {}
