import React, { useEffect } from 'react';
import { DragDropContext, DropResult, resetServerContext } from 'react-beautiful-dnd';

import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';

import { SearchOutlined } from '@ant-design/icons';
import { logout } from '@Redux/slices/account/accountSlice';
import { openEditCardModal } from '@Redux/slices/global/globalSlice';
import { dragListCard, getDndList } from '@Redux/slices/main/mainSlice';
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

  const handleAppendNewCard = () => {
    dispatch(
      openEditCardModal({
        title: "新增事項",
        width: 1000,
        type: "create",
        visible: true,
      })
    );
  };

  return (
    <div className="w-screen h-screen">
      {/* Header */}
      <div className="w-full flex justify-end bg-slate-400">
        <div className="p-10 py-5">
          <button
            className="bg-blue-500 rounded px-5 py-2 text-zinc-100 hover:bg-blue-400"
            onClick={handleLogout}
          >
            登出
          </button>
        </div>
      </div>
      {/* Nav */}
      <div className="flex w-full">
        <div className="flex w-full justify-between p-10">
          <div>
            <Input
              className="outline-slate-100  border-slate-100 border-2 p-1 px-2 flex items-center"
              suffix={<SearchOutlined className="cursor-pointer" />}
            />
          </div>
          <button
            className="bg-green-400 px-5 py-2 rounded text-zinc-100"
            onClick={handleAppendNewCard}
          >
            新增
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext(); // 如果要使用 Drag and Drop 功能，必須加入此行

  return { props: { data: [] } };
};

export default Main;
