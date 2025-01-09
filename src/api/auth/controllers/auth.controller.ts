import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDTO, RegisterDTO } from '../dtos';

@Controller('auth')
@ApiTags('web - auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('register')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: RegisterDTO })
  @ApiResponse({ status: 200, description: 'User registered in successfully' })
  async register(@Body() registerDTO: RegisterDTO, @Ip() clientIp: string) {
    return this.authService.register(registerDTO, clientIp);
  }
}
