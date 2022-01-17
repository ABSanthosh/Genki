import { createStore, action, persist } from "easy-peasy";
import { decks } from "./mockData";

let sampleDecks = decks;

const Store = createStore(
  persist({
    user: {},
    setUser: action((state, payload) => {
      state.user = payload;
    }),

    decks: sampleDecks,

    currentDeck: null,
    setCurrentDeck: action((state, payload) => {
      const id = payload;
      state.currentDeck = state.decks.find((deck) => {
        // console.log(state.currentDeck)
        return deck.deckId === id;
      });
    }),
  })
);

export default Store;
