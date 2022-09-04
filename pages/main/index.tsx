import React from 'react';
import { DragDropContext, DropResult, resetServerContext } from 'react-beautiful-dnd';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';

import { logout } from '@Redux/slices/account/accountSlice';
import { dragListCard } from '@Redux/slices/main/mainSlice';
import { RootState } from '@Redux/store';

import List from '../../components/List';

export interface DropProps {
  destination: {
    droppableId?: string;
    index?: number;
  };
  source: { droppableId?: string; index?: number };
}

const Main = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dndList = useAppSelector((state: RootState) => state.main.dndList.data);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleDragEnd = (e: DropResult) => {
    const { destination, source } = e;
    dispatch(
      dragListCard({
        destination: {
          droppableId: destination?.droppableId,
          index: destination?.index,
        },
        source: {
          droppableId: source?.droppableId,
          index: source?.index,
        },
      })
    );
  };

  return (
    <div className="w-screen h-screen">
      {/* Header */}
      <div className="w-full flex justify-end bg-slate-400">
        <div className="p-10">
          <button
            className="bg-blue-500 rounded px-5 py-2 text-zinc-100 hover:bg-blue-400"
            onClick={handleLogout}
          >
            登出
          </button>
        </div>
      </div>
      {/* Content */}
      <main className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <DragDropContext onDragEnd={(e: DropResult) => handleDragEnd(e)}>
          {dndList?.map((item) => (
            <List
              key={item.id}
              id={item.id}
              title={item.title}
              total={item.number}
              data={item.data}
            />
          ))}
        </DragDropContext>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // 如果要使用 Drag and Drop 功能，必須加入此行

  return { props: { data: [] } };
};

export default Main;
