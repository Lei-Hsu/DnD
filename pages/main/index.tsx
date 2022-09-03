import React from 'react';

import { ListCardProps } from 'components/Card/listCard';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useRouter } from 'next/router';

import { logout } from '@Redux/slices/account/accountSlice';
import { RootState } from '@Redux/store';

import List from '../../components/List';

const Mock: {
  title: string;
  number: number;
  data: ListCardProps[];
}[] = [
  {
    title: "TO DO",
    number: 0,
    data: [
      {
        title: "Implement Redux",
        account: "John Doe",
        types: "work",
        emergency: "high",
        cardId: "NUC-1",
        image:
          "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
      },
      {
        title: "Implement Network",
        account: "John Doe",
        types: "personal",
        emergency: "normal",
        cardId: "NUC-2",
        image:
          "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
      },
    ],
  },
  {
    title: "IN PROGRESS",
    number: 0,
    data: [
      {
        title: "Implement Network",
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
    title: "DONE",
    number: 0,
    data: [
      {
        title: "Implement Network",
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
    title: "READY TO DELETE",
    number: 0,
    data: [
      {
        title: "Implement Network",
        account: "John Doe",
        types: "personal",
        emergency: "low",
        cardId: "NUC-2",
        image:
          "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
      },
    ],
  },
];

const Main = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.account);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
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
      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {Mock.map((item) => (
          <List
            key={item.title}
            title={item.title}
            total={item.number}
            data={item.data}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Main);
