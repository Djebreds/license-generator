// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
// import { ApiKeyService } from '../services/api-key.service';
// import { I18nService } from 'nestjs-i18n';

// @Injectable()
// export class ApiKeyStrategy extends PassportStrategy(
//   HeaderAPIKeyStrategy,
//   'api-key',
// ) {
//   constructor(
//     private readonly apiKeyService: ApiKeyService,
//     private readonly i18n: I18nService,
//   ) {
//     super(
//       {
//         header: 'api-key',
//         prefix: '',
//       },
//       true,
//       async (apiKey, done) => {
//         const validateApiKey = await this.apiKeyService.findApiKey(apiKey);

//         if (validateApiKey) {
//           done(null, true);
//         }

//         done(
//           new UnauthorizedException(
//             this.i18n.t('general.authentication.error.invalidApiKey'),
//           ),
//         );
//       },
//     );
//   }
// }
