import { emergencyType, ListCardProps } from 'components/Card/listCard';
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
  },
  openCard: {
    data: Partial<ListCardProps>;
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
        data: [],
      },
      {
        id: 3,
        title: "DONE",
        number: 0,
        data: [],
      },
      {
        id: 4,
        title: "READY TO DELETE",
        number: 0,
        data: [],
      },
    ]
  },
  openCard: {
    data: {}
  }
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getDndList: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      state.dndList.data = item
    },
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
    addNewCard: (state, action: PayloadAction<{ title: string, emergency: emergencyType }>) => {
      const { title, emergency } = action.payload
      const copyState = JSON.parse(JSON.stringify(state.dndList))
      const newCard: ListCardProps = {
        id: Math.floor(Math.random() * 1000),
        title,
        account: "John Doe",
        types: "personal",
        emergency,
        cardId: `NUC-${Math.floor(Math.random() * 1000)}`,
        image:
          "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
      }
      copyState.data[0].data.push(newCard)
      state.dndList = copyState
    },
    openCard: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      const copyState = JSON.parse(JSON.stringify(state.dndList))
      const cardIdMap = new Map(copyState.data.map((item: any) => item.data.map((subItem: ListCardProps) => [subItem.id, subItem])).flat(1))
      const card = cardIdMap.get(id) as ListCardProps
      state.openCard.data = card
    },
    clearOpenCard: (state) => {
      state.openCard.data = {}
    },
    deleteCard: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      const copyState = JSON.parse(JSON.stringify(state.dndList))

      const list = copyState.data.find((item: any) => item.data.find((subItem: ListCardProps) => subItem.id === id))
      const listIndex = copyState.data.findIndex((item: any) => item.id === list.id)

      const card = list.data.filter((item: ListCardProps) => item.id !== id)
      state.dndList.data[listIndex].data = card
    },
    editCard: (state, action: PayloadAction<{ id: number, title: string, emergency: emergencyType }>) => {
      const { id, title, emergency } = action.payload
      const copyState = JSON.parse(JSON.stringify(state.dndList))

      const list = copyState.data.find((item: any) => item.data.find((subItem: ListCardProps) => subItem.id === id))
      const listIndex = copyState.data.findIndex((item: any) => item.id === list.id)
      let card = list.data.find((item: ListCardProps) => item.id === id)
      const cardIndex = list.data.findIndex((item: any) => item.id === card.id)
      card = {
        ...card,
        title,
        emergency
      }
      state.dndList.data[listIndex].data[cardIndex] = card
    }
  }
});

export const { getDndList, dragListCard, addNewCard, openCard, clearOpenCard, deleteCard, editCard } = mainSlice.actions;

export default mainSlice.reducer;
