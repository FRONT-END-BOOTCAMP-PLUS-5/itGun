import { NextRequest, NextResponse } from 'next/server';
import { GetUserInfoUsecase } from '../../../../backend/application/user/info/usecases/GetUserInfoUsecase';
import { PrUserRepository } from '../../../../backend/infrastructure/repositories/PrUserRepository';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const userRepository = new PrUserRepository();
    const getUserInfoUsecase = new GetUserInfoUsecase(userRepository);
    const result = await getUserInfoUsecase.execute({ userId });

    if (!result) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 