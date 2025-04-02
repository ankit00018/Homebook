
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
    addListing: (state, action) => {
      state.listings.push(action.payload);
    },
    removeListing: (state, action) => {
      state.listings = state.listings.filter(listing => listing._id !== action.payload);
    },
  },
});

export const { setListings, addListing, removeListing } = listingSlice.actions;
export default listingSlice.reducer;