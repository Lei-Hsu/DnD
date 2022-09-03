import { SliceRequest } from '@Redux/rootSlices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { addAxiosHeader, clearAxiosHeader } from '../../../axios/index';

export interface accountState {
  user: {
    request: SliceRequest;
    data: {
      login: boolean
      name: string
    }
  }
}

const initialState: accountState = {
  user: {
    request: {
      loading: false,
      loaded: false,
      hasError: false,
      error: '',
    },
    data: {
      login: false,
      name: ''
    }
  }
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    testClick: (_state) => { },
    login: (state, action: PayloadAction<{ login: boolean, name: string }>) => {
      state.user = {
        request: {
          loading: false,
          loaded: true,
          hasError: false,
          error: '',
        },
        data: {
          login: action.payload.login,
          name: action.payload.name
        }
      }
    },
  },
});

export const { login, testClick } = accountSlice.actions;

export default accountSlice.reducer;
