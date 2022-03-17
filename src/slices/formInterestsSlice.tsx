import { createSlice } from '@reduxjs/toolkit';

import defaultInterests from '../default-interests';

const initialState = {
  value: defaultInterests,
};

export const formInterestsSlice = createSlice({
  name: 'formInterests',
  initialState,
  reducers: {
    toggleInterest: (state, action) => {
      if (action.payload === 0) {
        // If toggling the Everything interest
        if (state.value[0].selected) {
          // "Un-select" the Everything interest
          state.value = state.value.map((interest) => {
            return interest.id === 0
              ? { ...interest, selected: !interest.selected }
              : interest;
          });
        } else {
          // "Select" all interests
          state.value = state.value.map((interest) => {
            return { ...interest, selected: true };
          });
        }
      } else if (state.value[0].selected) {
        // If not toggling the Everything interest but Everything is selected
        // "Un-select" the Everything interest
        state.value = state.value.map((interest) => {
          if (interest.id === 0) {
            return { ...interest, selected: false };
          } else {
            return interest.id === action.payload
              ? { ...interest, selected: !interest.selected }
              : interest;
          }
        });
      } else {
        state.value = state.value.map((interest) => {
          return interest.id === action.payload
            ? { ...interest, selected: !interest.selected }
            : interest;
        });
      }
    },
  },
});

export const { toggleInterest } = formInterestsSlice.actions;
export default formInterestsSlice.reducer;
