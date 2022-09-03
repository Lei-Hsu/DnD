import React from 'react';

interface ListProps {
  title: string;
  total: number;
}

const List = ({ title, total }: ListProps) => {
  return (
    <div className="bg-slate-100 rounded-sm">
      <div className="px-5 py-2 text-slate-500 flex justify-between">
        <p>{title}</p>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default List;
