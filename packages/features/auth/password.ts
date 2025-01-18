import { hash, compare, genSalt } from "bcryptjs";
import { randomPassword } from 'secure-random-password';

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt();
  return await hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}

export function generateRandomPassword(length: number = 10): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return randomPassword({ length, characters: charset });
}
