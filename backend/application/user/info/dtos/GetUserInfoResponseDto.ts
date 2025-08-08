// 회원정보 조회 응답 DTO
export interface GetUserInfoResponseDto {
  userId: string;
  email: string;
  nickName: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  characterId?: number;
  characterColor?: string;
} 