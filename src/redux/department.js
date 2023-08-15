import * as ActionTypes from "./ActionTypes";

export const Department = (
  state = {
    isLoading: true,
    errMess: null,
    department: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTS:
      return {
        ...state,
        isLoading: false, // sau khi nhận được thông tin staff từ máy chủ đặt isLoading:false và tải thông tin staff vào state
        errMess: null,
        department: action.payload,
      };

    case ActionTypes.DEPARTS_LOADING:
      return {
        ...state,
        isLoading: true, //Bất cứ khi nào đi đến máy chủ lấy thông tin staff từ máy chủ thì isLoading true
        errMess: null,
        department: [],
      };

    case ActionTypes.DEPARTS_FAILED:
      return {
        ...state,
        isLoading: false, //Khi không tải được thông tin staff từ máy chủ thì isLoading:false
        errMess: action.payload,
        department: [],
      };

    default:
      return state;
  }
};
