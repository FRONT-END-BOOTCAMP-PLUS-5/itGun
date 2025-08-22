import { GetBadgeDto } from "./GetBadgeDto"
import { GetUserBadgeDto } from "./GetUserBadgeDto"

export class GetUserBadgeListDto {
  constructor(
    public badges: GetBadgeDto[],
    public userBadges: GetUserBadgeDto[] | null
  ) {}
}
