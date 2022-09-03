import React from 'react';

import ListCard, { ListCardProps } from 'components/Card/listCard';

interface ListProps {
  title: string;
  total: number;
  data?: ListCardProps[];
}

const List = ({ title, total, data }: ListProps) => {
  return (
    <div className="bg-slate-100 rounded-sm">
      <div className="px-5 py-2 text-slate-500 flex justify-between">
        <p>{title}</p>
        {/* <span>{total}</span> */}
        <span>{data?.length || 0}</span>
      </div>
      <main className="flex flex-col gap-1 p-1">
        {data?.map((item, index) => (
          <div key={item.cardId} className="cursor-pointer w-full h-fit">
            <ListCard
              title={item.title}
              account={item.account}
              types={item.types}
              emergency={item.emergency}
              cardId={item.cardId}
              image={item.image}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default List;
