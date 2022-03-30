import { configureStore } from '@reduxjs/toolkit';
import formNameReducer from './slices/formNameSlice';
import formBudgetReducer from './slices/formBudgetSlice';
import formInterestsReducer from './slices/formInterestsSlice';
import formStepReducer from './slices/formStepSlice';

export const store = configureStore({
  reducer: {
    formName: formNameReducer,
    formBudget: formBudgetReducer,
    formInterests: formInterestsReducer,
    formStep: formStepReducer,
  },
});

// Infer RootState and AppDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
