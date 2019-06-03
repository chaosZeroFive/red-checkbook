import React, { useReducer } from "react";
import axios from "axios";
import enemyContext from "./enemyContext";
import enemyReducer from "./enemyReducer";

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

const EnemyState = props => {
  const initialState = {
    enemy: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(enemyReducer, initialState);

  // Get Enemy
  const getEnemy = async () => {
    try {
      const res = await axios.get("/api/enemy");

      dispatch({
        type: GET_ENEMY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ENEMY_ERROR,
        payload: err.response.msg
      });
    }
  };
  //Add Enemy
  const addEnemy = async enemy => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/enemy", enemy, config);
      dispatch({
        type: ADD_ENEMY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ENEMY_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Delete Enemy
  const deleteEnemy = async id => {
    try {
      await axios.delete(`/api/enemy/${id}`);
      dispatch({
        type: DELETE_ENEMY,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ENEMY_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Update Enemy
  const updateEnemy = async enemy => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(`/api/enemy/${enemy._id}`, enemy, config);

      dispatch({
        type: UPDATE_ENEMY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ENEMY_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Clear Enemy
  const clearEnemy = () => {
    dispatch({ type: CLEAR_ENEMY });
  };
  // Set Current Enemy
  const setCurrent = enemy => {
    dispatch({ type: SET_CURRENT, payload: enemy });
  };
  // Clear Current Enemy
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  return (
    <enemyContext.Provider
      value={{
        enemy: state.enemy,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addEnemy,
        deleteEnemy,
        setCurrent,
        clearCurrent,
        clearEnemy,
        getEnemy,
        updateEnemy
      }}>
      {props.children}
    </enemyContext.Provider>
  );
};

export default EnemyState;
