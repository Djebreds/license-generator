import { Injectable } from '@nestjs/common';
import { ApiKeyRepository } from '../repositories/api-key.repository';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async findKey(key: string) {
    const apiKey = await this;
  }
}
