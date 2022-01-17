import { createStore, action, computed } from "easy-peasy";
import { decks } from "./mockData";

let sampleDecks = decks;

const Store = createStore({
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),

  decks: sampleDecks,
  currentDeck: computed((state) => {
    return state.decks[0];
  }),
  setCurrentDeck: action((state, payload) => {
    const id = payload;
    state.currentDeck = state.decks.find((deck) => deck.id === id);
  }),
});

export default Store;
