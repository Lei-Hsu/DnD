import { ListCardProps } from 'components/Card/listCard';
import { DropProps } from 'pages/main';

import { SliceRequest } from '@Redux/rootSlices';
import { compose, createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { addAxiosHeader, clearAxiosHeader } from '../../../axios/index';

export interface mainState {
  dndList: {
    request: SliceRequest;
    data: {
      id: number;
      title: string;
      number: number;
      data: ListCardProps[];
    }[]
  }
}

const initialState: mainState = {
  dndList: {
    request: {
      loading: false,
      loaded: false,
      hasError: false,
      error: '',
    },
    data: [
      {
        id: 1,
        title: "TO DO",
        number: 0,
        data: [
        ],
      },
      {
        id: 2,
        title: "IN PROGRESS",
        number: 0,
        data: [
          {
            id: 3,
            title: "Implement Network12",
            account: "John Doe",
            types: "personal",
            emergency: "low",
            cardId: "NUC-2",
            image:
              "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
          },
        ],
      },
      {
        id: 3,
        title: "DONE",
        number: 0,
        data: [
          {
            id: 4,
            title: "Implement Network",
            account: "John Doe",
            types: "personal",
            emergency: "low",
            cardId: "NUC-3",
            image:
              "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
          },
        ],
      },
      {
        id: 4,
        title: "READY TO DELETE",
        number: 0,
        data: [
          {
            id: 1,
            title: "Implement Redux",
            account: "John Doe",
            types: "work",
            emergency: "high",
            cardId: "NUC-1",
            image:
              "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
          },
          {
            id: 2,
            title: "Implement Network",
            account: "John Doe",
            types: "personal",
            emergency: "normal",
            cardId: "NUC-7",
            image:
              "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
          },
          {
            id: 5,
            title: "Implement Network1",
            account: "John Doe",
            types: "personal",
            emergency: "low",
            cardId: "NUC-4",
            image:
              "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
          },
          {
            id: 6,
            title: "Implement Network2",
            account: "John Doe",
            types: "personal",
            emergency: "low",
            cardId: "NUC-5",
            image:
              "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
          },
        ],
      },
    ]
  }
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    dragListCard: (state, action: PayloadAction<DropProps>) => {
      const { destination, source } = action.payload
      const isCorrectDrop = source.droppableId !== undefined && source.index !== undefined && destination !== undefined && destination.index !== undefined
      const sameList = destination.droppableId === source.droppableId
      const copyState = JSON.parse(JSON.stringify(state.dndList))

      if (sameList) {
        const result: ListCardProps[] = Array.from(copyState.data[Number(source.droppableId) - 1]?.data);
        const [removed] = result.splice(source.index as number, 1)
        result.splice(destination.index as number, 0, removed)
        state.dndList.data[Number(source.droppableId) - 1].data = result
        return
      }

      if (isCorrectDrop) {
        // 移除舊的 card
        const sourceResult: ListCardProps[] = Array.from(copyState.data[Number(source.droppableId) - 1]?.data)
        sourceResult.splice(source.index as number, 1)
        // 新增新的 card
        const destinationResult: ListCardProps[] = Array.from(copyState.data[Number(destination.droppableId) - 1]?.data)
        const card = copyState.data[Number(source.droppableId) - 1].data[source.index as number]
        destinationResult.splice(destination.index as number, 0, card)

        state.dndList.data[Number(source.droppableId) - 1].data = sourceResult
        state.dndList.data[Number(destination.droppableId) - 1].data = destinationResult
      }
    },
  }
});

export const { dragListCard } = mainSlice.actions;

export default mainSlice.reducer;
