import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const incomingHeaders = await headers();
    const cookieHeader = incomingHeaders.get('cookie') || '';

    const tokenResponse = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/token`,
      {
        headers: { cookie: cookieHeader },
      },
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token fetch failed:', tokenResponse.status, errorText);
      return NextResponse.json(
        { success: false, debug: errorText, status: tokenResponse.status },
        { status: 401 },
      );
    }

    const data = await tokenResponse.json();
    const token = data?.token;

    if (!token) {
      console.error('No token in response:', data);
      return NextResponse.json(
        { success: false, debug: 'No token field', data },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 15,
    });

    return response;
  } catch (error) {
    console.error('set-token error:', error);
    return NextResponse.json(
      { success: false, debug: error.message },
      { status: 500 },
    );
  }
}
