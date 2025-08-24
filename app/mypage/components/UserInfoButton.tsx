import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"

const UserInfoButton = () => {
  return (
    <div className="flex w-full justify-center">
      <Button size="lx">
        저장
        <Icon name="save" color="white-100" size={20} />
      </Button>
    </div>
  )
}

export default UserInfoButton
