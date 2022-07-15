import {
  GET_CHARACTERS,
  GET_DETAIL,
  GET_EPISODES,
  CREATE_CHARACTER,
} from "./actionsTypes";

const initialState = {
  characters: [],
  character: {},
  episodes: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        character: action.payload,
      };

    case GET_EPISODES:
      return {
        ...state,
        episodes: action.payload,
      };
    case CREATE_CHARACTER:
      return {
        ...state,
        characters: [...state.characters, action.payload],
      };

    default:
      return {
        ...state,
      };
  }
}
