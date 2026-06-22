export const DEFAULT_AVATAR = "🤖"
export const DEFAULT_USER_AVATAR = "😀"

export const createUserSchema = () => ({
  userID: "",
  nick: "",
  gender: "",
  birthday: 0,
  location: "",
  selfSignature: "",
  allowType: "",
  language: 0,
  avatar: "",
  messageSettings: 0,
  adminForbidType: "",
  level: 0,
  role: 0,
  lastUpdatedTime: 0,
  profileCustomField: [],

  native: DEFAULT_AVATAR,
})

export const UserSchema = createUserSchema()

export const UserfileSchema = {
  ...createUserSchema(),
  userID: "admin",
  nick: "admin",
  avatar: "avatar",
  native: DEFAULT_USER_AVATAR,
}
