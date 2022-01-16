import { createStore, action } from "easy-peasy";

const Store = createStore({
  user: {},

  setUser: action((state, payload) => {
    state.user = payload;
  }),
});

export default Store;
