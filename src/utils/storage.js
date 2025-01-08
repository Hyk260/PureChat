import localforage from 'localforage';

const {
  VITE_STORAGE_PREFIX: storagePrefix
} = import.meta.env;

// 'local' | 'session';
export function createStorage(type, storagePrefix) {
  const stg = type === 'session' ? window.sessionStorage : window.localStorage;

  const storage = {
    set(key, value) {
      const json = JSON.stringify(value);

      stg.setItem(`${storagePrefix}${key}`, json);
    },
    get(key) {
      const json = stg.getItem(`${storagePrefix}${key}`);
      if (json) {
        let storageData = null;

        try {
          storageData = JSON.parse(json);
        } catch { }

        if (storageData) {
          return storageData;
        }
      }

      stg.removeItem(`${storagePrefix}${key}`);

      return null;
    },
    remove(key) {
      stg.removeItem(`${storagePrefix}${key}`);
    },
    clear() {
      stg.clear();
    }
  };
  return storage;
}

// 'local' | 'indexedDB' | 'webSQL';
export function createLocalforage(driver = 'indexedDB') {
  const driverMap = {
    local: localforage.LOCALSTORAGE,
    indexedDB: localforage.INDEXEDDB,
    webSQL: localforage.WEBSQL
  };

  localforage.config({
    driver: driverMap[driver],
    name: "PURE_CHAT_DB",
    storeName: 'userDataStore',
  });

  return localforage;
}

export const localStg = createStorage('local', storagePrefix);
