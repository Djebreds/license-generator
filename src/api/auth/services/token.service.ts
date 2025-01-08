import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Verify JWT service
   * @param token JWT token
   * @returns decrypted payload from JWT
   */
  public verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Generate JWT token
   * @param payload {JwtPayload}
   * @param expiresIn {string}
   * @returns Promise<string>
   */
  public async generateToken(payload: any): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid payload');
    }
  }
}
