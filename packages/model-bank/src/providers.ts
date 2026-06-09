import { UserSchema as baseUserProfile } from "@pure/const"
import { DEFAULT_MODEL_PROVIDER_LIST } from "model-bank"
import { providerToModelId, type Provider } from "./const/modelProvider"

const providerCards = DEFAULT_MODEL_PROVIDER_LIST as any[]

export const providersList = providerCards.map((card) => ({
  ...baseUserProfile,
  userID: providerToModelId[card.id as Provider] as string,
  nick: card.name,
  selfSignature: card.description ?? "",
  profileCustomField: [
    { key: "Tag_Profile_Custom_Provider", value: card.name },
    { key: "Tag_Profile_Custom_Homepage", value: card.url },
  ],
}))
