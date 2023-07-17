import { createReducer, createAction, on } from '@ngrx/store';

export const usersReducer = createReducer(
  { maskUsername: false },
  on(createAction('[Users] Toggle Mask Username'), (state) => {
    console.log(state);
    return {
      ...state,
      maskUsername: !state.maskUsername,
    };
  })
);
