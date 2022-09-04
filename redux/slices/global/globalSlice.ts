import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { addAxiosHeader, clearAxiosHeader } from '../../../axios/index';

export interface OpenEditCardModalType {
  visible: boolean;
  width?: number;
  type: 'create' | 'edit';
  title: string;
}

export interface globalState {
  editCardModal: OpenEditCardModalType
}

const initialState: globalState = {
  editCardModal: {
    visible: false,
    width: 1000,
    type: 'create',
    title: ''
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openEditCardModal: (state, action: PayloadAction<OpenEditCardModalType>) => {
      state.editCardModal = action.payload;
    },
    closeEditCardModal: (state) => {
      state.editCardModal.visible = false;
    }
  }
});

export const { openEditCardModal, closeEditCardModal } = globalSlice.actions;

export default globalSlice.reducer;
