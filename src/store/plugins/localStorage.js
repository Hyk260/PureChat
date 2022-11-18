import storage from "storejs";
import { USER_DATA, SET_UP } from '@/store/mutation-types';

export default (store) => {
  store.subscribe((mutation, state) => {
    const { data, settings } = state;
    const { payload, type } = mutation;
    switch (type) {
      case "updateData":
        storage.set(USER_DATA, data);
        break;
      case "updateSettings":
        storage.set(SET_UP, settings);
        break;
    }
  });
};
