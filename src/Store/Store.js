/* eslint-disable no-extend-native */
import { createStore, action, persist } from "easy-peasy";
import { decks } from "./mockData";

let sampleDecks = decks;
Date.prototype.today = function () {
  return (
    (this.getDate() < 10 ? "0" : "") +
    this.getDate() +
    "/" +
    (this.getMonth() + 1 < 10 ? "0" : "") +
    (this.getMonth() + 1) +
    "/" +
    this.getFullYear()
  );
};

// For the time now
Date.prototype.timeNow = function () {
  return (
    (this.getHours() < 10 ? "0" : "") +
    this.getHours() +
    ":" +
    (this.getMinutes() < 10 ? "0" : "") +
    this.getMinutes() +
    ":" +
    (this.getSeconds() < 10 ? "0" : "") +
    this.getSeconds()
  );
};
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
        return deck.id === id;
      });
    }),

    addNewDeck: action((state, payload) => {
      // payload
      // {
      //   title: "This is new deck",
      //   author: "Santhosh",
      //   description: "Small description",
      //   cards: [
      //     { id: 1, front: "front data", back: "Back data",options: null },
      //   ],
      // };

      state.decks = [
        ...state.decks,
        {
          id: `${Math.random().toString(36).substring(2, 9)}`,
          title: payload.title,
          author: payload.author,
          description: payload.description,
          createdAt: new Date().today() + " @ " + new Date().timeNow(),
          cards: payload.cards,
        },
      ];
    }),

    updateDeck: action((state, payload) => {
      state.decks = state.decks.map((deck) => {
        if (deck.id === payload.id) {
          deck.title = payload.title;
          deck.author = payload.author;
          deck.description = payload.description;
          deck.cards = payload.cards;
        }
        return deck;
      })
    }),
  })
);

export default Store;
