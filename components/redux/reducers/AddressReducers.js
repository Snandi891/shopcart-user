import { ADD_ADDRESS, REMOVE_ADDRESS } from "../ActionTypes";

const AddressReducers = (state = [], action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return [...state, action.payload];

    case REMOVE_ADDRESS:
      const deleteArray1 = state.filter((item, index) => {
        return index !== action.payload;
      });

      return deleteArray1;
    default:
      return state;
  }
};
export default AddressReducers;
