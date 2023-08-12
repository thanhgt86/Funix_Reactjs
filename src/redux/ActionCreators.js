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
        var errmess = new Error(error.message);
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
