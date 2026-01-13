import type { GroupMemberType as GroupMember, GroupProfileSchemaType as GroupProfile } from "@pure/database/schemas"

export interface GroupState {
  groupList: any[]
  groupProfile: GroupProfile | null
  currentMemberList: GroupMember[]
}

export interface SetGroupProfilePayload {
  groupProfile: GroupProfile
}

export interface HandleGroupMemberListPayload {
  isSort?: boolean
  groupID?: string
}

export interface HandleQuitGroupPayload {
  sessionId: string
  groupId: string
}

export interface HandleCreateGroupPayload {
  groupName: string
  positioning?: boolean
}

export interface HandleDismissGroupPayload {
  sessionId: string
  groupId: string
}

export interface HandleGroupProfilePayload {
  type: string
  groupProfile?: {
    groupID: string
  }
}
