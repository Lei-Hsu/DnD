import React from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';

import { AppState, RootState } from '@Redux/store';

import List from '../../components/List';

const Mock = [
  {
    title: "TO DO",
    number: 0,
  },
  {
    title: "IN PROGRESS",
    number: 0,
  },
  {
    title: "DONE",
    number: 0,
  },
  {
    title: "READY TO DELETE",
    number: 0,
  },
];

const Main = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.account);

  console.log(user);

  return (
    <div className="w-screen h-screen">
      {/* Header */}
      <div className="w-full flex justify-end bg-slate-400">
        <div className="p-10">
          <button className="bg-blue-500 rounded px-5 py-2 text-zinc-100 hover:bg-blue-400">
            登出
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {Mock.map((item) => (
          <List key={item.title} title={item.title} total={item.number} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Main);
