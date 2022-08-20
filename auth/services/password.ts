import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class PasswordService {
  /**
   *
   */

  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(password: string, candidatePassword: string) {
    const [hashedPassword, salt] = candidatePassword.split(".");
    const buf = (await scryptAsync(candidatePassword, salt, 64)) as Buffer;
    
    return buf.toString("hex") === hashedPassword;
  }
}
