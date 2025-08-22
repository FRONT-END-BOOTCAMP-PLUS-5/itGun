export interface AwardedBadgeDto {
  badgeId: number;
  badgeName: string;
  badgeDescription?: string;
  earnedAt: Date;
}

export interface CreateLogResponseDto {
  success: boolean;
  message: string;
  logId?: number;
  awardedBadges?: AwardedBadgeDto[];
}
