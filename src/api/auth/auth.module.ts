import { Module } from '@nestjs/common';
import { ApiKeyService } from './services/api-key.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TokenService],
})
export class AuthModule {}
