import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'autowise_jwt_development_secret_key_88492049';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(user: UserSession): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSession;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('autowise_session')?.value;
    if (!token) {
      // Fallback: return default demo user if available
      const demoUser = await prisma.user.findUnique({
        where: { email: 'user@autowise.ai' },
      });
      if (demoUser) {
        return {
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name || 'Demo User',
          role: demoUser.role,
        };
      }
      return null;
    }
    return verifyToken(token);
  } catch {
    return null;
  }
}
