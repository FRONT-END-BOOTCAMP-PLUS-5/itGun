import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// 회원 정보 타입 정의
interface UserInfoResponse {
  user_id: string;
  email: string;
  nick_name: string;
  age: number | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
  characterId: number | null;
  characterColor: string | null;
}

export async function GET(req: NextRequest) {
  try {
    const userid = req.nextUrl.searchParams.get('userid');
    if (!userid) {
      return NextResponse.json({ error: 'userid is required' }, { status: 400 });
    }

    // Prisma를 사용하여 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { id: userid },
      select: {
        id: true,
        email: true,
        nickName: true,
        age: true,
        gender: true,
        height: true,
        weight: true,
        characterId: true,
        characterColor: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 응답 객체 생성
    const response: UserInfoResponse = {
      user_id: user.id,
      email: user.email,
      nick_name: user.nickName,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      characterId: user.characterId, 
      characterColor: user.characterColor,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 