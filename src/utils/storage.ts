import { createStorage, type StorageType } from "@pure/utils/storage"

const { VITE_STORAGE_PREFIX: storagePrefix } = import.meta.env

export const localStg = createStorage<StorageType.Local>("local", storagePrefix)

export const sessionStg = createStorage<StorageType.Local>("session", storagePrefix)

export type LocalStg = typeof localStg

export type SessionStg = typeof sessionStg
