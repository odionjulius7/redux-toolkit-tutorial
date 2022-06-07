import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

// state, when we have many items in a particular feature
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

// or we could use a local data like dis down
// import cartItems from '../../cartItems'
// const initialState = {
//   cartItems: cartItems,
//   amount: 4,
//   total: 0,
//   isLoading: true,
// };

//fetching API data with createAsyncThunk()
// it needs a type "cart/getCartItems" and a callBack func
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // console.log(name); // this could be any argument we pass to the getCartItems() in our component(like search item) when making the dispatch
      // console.log(thunkAPI); thunkAPI gives a ton of options like getting the whole state value, getting things from another slice
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      // we can use it to return an error (for axios error.resp)
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

// we can do a simple fetch with fetch()
// export const getCartItems = createAsyncThunk(
//   "cart/getCartItems", () => {
//     return fetch(url)
//       .then((resp) => resp.json())
//       .catch((err) => console.log(error));
//   }
// );

// slice is a just like dividing you app funtionality it to subdivision,
// where each controls a particular aspect of the funtion or activities
const cartSlice = createSlice({
  // this particular slice controls the cart details and funtionality
  name: "cart",
  initialState,
  reducers: {
    // the reducer is what  modifies the state in the slice
    clearCart: (state) => {
      // the clear reducer, clears the values of the cart array but notice that we can directly mutate the state value directly
      // which was not possible with the usual redux but becos we install redux/toolkit it automatically install immer for us
      // which inturn helps modify and making the settings for us to directly modify state values
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      // just like normal redux/useReducer u have action.payload and action.type === removeItem
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    // what we mean if cartItem value that was passed to it when find() was true is it replaces the item in the state.cartItems
    // that means that particular item is been changed to cartItem ("call directly mutation of the state")
    increase: (state, { payload }) => {
      // we directly destructured payload(is an object) frm action
      // just like normal redux/useReducer u have action.payload and action.type === removeItem
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      // if the item we clicked on matches the an id in the state.cartItems
      cartItem.amount = cartItem.amount + 1; // the increase the item.amount by one
      // and in turn the calculateTotals() will run all over to update the state
    },
    decrease: (state, { payload }) => {
      // we directly destructured payload(is an object) frm action
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1; // so also reduce the item.amount by one
      // and in turn the calculateTotals() will run all over to update the state
    },

    // now the total here where we make changes to state amount and state total
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        // this we loop thru the items in the cartItems array and add each item.amount to the amount and total
        // remember we made a decrease and increase func fr the cartItems amount
        amount += item.amount; // is an item has 3 amount it will add it and another has 1 it'll be added, so on till the looping finishes
        total += item.amount * item.price;
      });
      // that means when we remove an item from our cart it reflects on the state amount and state total
      // likewise when we decrease and increase a single item in the cartItem array amount
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    // for any fetch func we create(that returns a promise)
    // we need to create lifecycle for it, pending, fulfilled and rejected to complete the promise it returns
    [getCartItems.pending]: (state) => {
      state.isLoading = true; // if the promise is still pending our state.isLoading will be true
    },
    [getCartItems.fulfilled]: (state, action) => {
      // console.log(action); the action carries the payload data from getCartItems, when it fetches data successful
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions; // needed by the component that wants to carry out the action

export default cartSlice.reducer; // needed by store
