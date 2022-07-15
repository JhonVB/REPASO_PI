import {
  CREATE_CHARACTER,
  GET_CHARACTERS,
  GET_DETAIL,
  GET_EPISODES,
} from "./actionsTypes";
import axios from "axios";

export function getCharacters() {
  return async function (dispatch) {
    var info = await axios.get(`http://localhost:3001/characters`);
    //  console.log(info.data);
    return dispatch({
      type: GET_CHARACTERS,
      payload: info.data,
    });
  };
}

export function getCharacter(info) {
  return function (dispatch) {
    return dispatch({
      type: GET_DETAIL,
      payload: info,
    });
  };
}

export function getEpisodes() {
  return async function (dispatch) {
    var info = await axios.get(`http://localhost:3001/episodes`);
    //  console.log(info.data);
    return dispatch({
      type: GET_EPISODES,
      payload: info.data,
    });
  };
}

//revisar como trae la info del back
export function createCharacter(estado) {
  return async function (dispatch) {
    var info = await axios.post(`http://localhost:3001/character`, estado);
    console.log(info);
    return dispatch({
      type: CREATE_CHARACTER,
      payload: info.data,
    });
  };
}
