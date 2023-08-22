import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading());

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error(
            "Error " + response.status + ": " + response.statusText
          );
        }
      },
      (error) => {
        // xử lý lỗi với trường hợp máy chủ không phản hồi
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});
////////////////////////////////////////
export const postStaffs = (staffs) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(staffs),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error(
            "Error " + response.status + ": " + response.statusText
          );
        }
      },
      (error) => {
        // xử lý lỗi với trường hợp máy chủ không phản hồi
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

// /////////////////// ActionCreator for Department
export const fetchDeparts = () => (dispatch) => {
  dispatch(departsLoading());

  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error(
            "Error " + response.status + ": " + response.statusText
          );
        }
      },
      (error) => {
        // xử lý lỗi với trường hợp máy chủ không phản hồi
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departs) => dispatch(addDeparts(departs)))
    .catch((error) => dispatch(departsFailed(error.message)));
};

export const departsLoading = () => ({
  type: ActionTypes.DEPARTS_LOADING,
});

export const departsFailed = (errmess) => ({
  type: ActionTypes.DEPARTS_FAILED,
  payload: errmess,
});

export const addDeparts = (departs) => ({
  type: ActionTypes.ADD_DEPARTS,
  payload: departs,
});

// /////////////////// ActionCreator for Salary
export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading());

  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error(
            "Error " + response.status + ": " + response.statusText
          );
        }
      },
      (error) => {
        // xử lý lỗi với trường hợp máy chủ không phản hồi
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((salary) => dispatch(addSalary(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});
