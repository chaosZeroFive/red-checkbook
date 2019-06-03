import {
  GET_ENEMY,
  ADD_ENEMY,
  DELETE_ENEMY,
  UPDATE_ENEMY,
  CLEAR_ENEMY,
  ENEMY_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ENEMY:
      return {
        ...state,
        enemy: action.payload,
        loading: false
      };
    case ADD_ENEMY:
      return {
        ...state,
        enemy: [action.payload, ...state.enemy],
        loading: false
      };
    case UPDATE_ENEMY:
      return {
        ...state,
        enemy: state.enemy.map(enemy =>
          enemy.id === action.payload._id ? action.payload : enemy
        ),
        loading: false
      };
    case DELETE_ENEMY:
      return {
        ...state,
        enemy: state.enemy.filter(enemy => enemy._id !== action.payload),
        loading: false
      };
    case CLEAR_ENEMY:
      return {
        ...state,
        enemy: null,
        filtered: null,
        error: null,
        current: null
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case ENEMY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
