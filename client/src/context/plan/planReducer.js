//REVISED: This fIle has been changed from the original

import {
  GET_PLANS,
  ADD_PLAN,
  DELETE_PLAN,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PLAN,
  FILTER_PLANS,
  CLEAR_FILTER,
  PLAN_ERROR,
  CLEAR_PLANS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PLANS:
      return {
        ...state,
        plans: action.payload,
        loading: false
      };
    case ADD_PLAN:
      return {
        ...state,
        plans: [action.payload, ...state.plans],
        loading: false
      };
    case UPDATE_PLAN:
      return {
        ...state,
        plans: state.plans.map(plan =>
          plan._id === action.payload._id ? action.payload : plan
        ),
        loading: false
      };
    case DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter(plan => plan._id !== action.payload),
        loading: false
      };
    case CLEAR_PLANS:
      return {
        ...state,
        plans: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_PLANS:
      return {
        ...state,
        filtered: state.plans.filter(plan => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return plan.name.match(regex) || plan.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case PLAN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
