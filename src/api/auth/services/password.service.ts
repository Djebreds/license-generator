import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  /**
   * Comparing user password against password hash
   * @param args {object}
   * @returns {Promise<Boolean>}
   */
  public async comparePassword(args: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hash);
  }

  /**
   * Hashes a password using
   * @param password {string}
   * @returns {string}
   */
  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, this.saltRounds);
  }
}
