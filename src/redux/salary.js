import * as ActionTypes from "./ActionTypes";

export const Salary = (
  state = {
    isLoading: true,
    errMess: null,
    salary: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SALARY:
      return {
        ...state,
        isLoading: false, // sau khi nhận được thông tin salary từ máy chủ đặt isLoading:false và tải thông tin salary vào state
        errMess: null,
        salary: action.payload,
      };

    case ActionTypes.SALARY_LOADING:
      return {
        ...state,
        isLoading: true, //Bất cứ khi nào đi đến máy chủ lấy thông tin salary từ máy chủ thì isLoading true
        errMess: null,
        salary: [],
      };

    case ActionTypes.SALARY_FAILED:
      return {
        ...state,
        isLoading: false, //Khi không tải được thông tin salary từ máy chủ thì isLoading:false
        errMess: action.payload,
        salary: [],
      };

    default:
      return state;
  }
};
