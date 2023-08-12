import * as ActionTypes from "./ActionTypes";

export const Person = (
  state = {
    isLoading: true,
    errMess: null,
    person: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false, // sau khi nhận được thông tin staff từ máy chủ đặt isLoading:false và tải thông tin staff vào state
        errMess: null,
        person: action.payload,
      };

    case ActionTypes.STAFFS_LOADING:
      return {
        ...state,
        isLoading: true, //Bất cứ khi nào đi đến máy chủ lấy thông tin staff từ máy chủ thì isLoading true
        errMess: null,
        person: [],
      };

    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false, //Khi không tải được thông tin staff từ máy chủ thì isLoading:false
        errMess: action.payload,
        person: [],
      };

    default:
      return state;
  }
};
