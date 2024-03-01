import User from "../../api/user/model/user"

const existedUser = async (email: string) => {
    const user = await User.findOne({ email })
    return user
}

export default existedUser