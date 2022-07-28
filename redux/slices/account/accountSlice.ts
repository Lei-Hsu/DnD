import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { addAxiosHeader, clearAxiosHeader } from '../../../axios/index';

export interface accountState {
    value: {};
}

const initialState: accountState = {
    value: {},
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        testClick: (_state) => { },
        login: (_state, _action: PayloadAction<any>) => { },

    },
});

export const { login, testClick } = accountSlice.actions;

export default accountSlice.reducer;
