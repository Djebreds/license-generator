import { Injectable } from '@nestjs/common';
import { ApiKeyRepository } from '../repositories/api-key.repository';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async getApiKey(key: string) {
    const apiKey = await this.apiKeyRepository.findOne({
      where: {
        key,
      },
    });

    return apiKey;
  }
}
