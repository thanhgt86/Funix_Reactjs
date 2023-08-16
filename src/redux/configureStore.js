import { createStore, combineReducers } from "redux";
import { Person } from "./person";
import { Department } from "./department";
import { Salary } from "./salary";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      person: Person,
      department: Department,
      salary: Salary,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
