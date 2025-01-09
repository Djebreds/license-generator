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
import { JwtStrategy } from './strategies/jwt.strategy';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
    PassportModule.register({
      defaultStrategy: ['jwt'],
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthMapper,
    AuthService,
    ApiKeyService,
    ApiKeyRepository,
    TokenService,
    PasswordService,
    JwtStrategy,
    ApiKeyStrategy,
  ],
  exports: [
    JwtModule,
    PassportModule,
    TokenService,
    PasswordService,
    ApiKeyService,
    AuthService,
    JwtStrategy,
    ApiKeyStrategy,
  ],
})
export class AuthModule {}
