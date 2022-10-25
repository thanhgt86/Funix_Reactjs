import { createStore, combineReducers } from "redux";
import { Person } from "./person";
import { Department } from "./department";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      person: Person,
      department: Department,
    })
  );

  return store;
};
