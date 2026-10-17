import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { action, email, password } = await req.json();

    if (action === 'demo_login') {
      const demoEmail = email || 'user@autowise.ai';
      const user = await prisma.user.findUnique({
        where: { email: demoEmail },
      });
      if (!user) {
        return NextResponse.json({ error: 'Demo user not found' }, { status: 404 });
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        name: user.name || 'AutoWise Driver',
        role: user.role,
      });

      const res = NextResponse.json({ success: true, user });
      res.cookies.set('autowise_session', token, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    if (action === 'login') {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.passwordHash) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        name: user.name || 'User',
        role: user.role,
      });

      const res = NextResponse.json({ success: true, user });
      res.cookies.set('autowise_session', token, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    if (action === 'logout') {
      const res = NextResponse.json({ success: true });
      res.cookies.delete('autowise_session');
      return res;
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Auth failure' }, { status: 500 });
  }
}
