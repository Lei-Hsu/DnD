import React from 'react';

import { DoubleLeftOutlined, LineOutlined } from '@ant-design/icons';

export interface ListCardProps {
  id: number;
  title: string;
  account: string;
  types: string;
  emergency: "high" | "low" | "normal";
  cardId: string;
  image?: string;
}

enum EmergencyType {
  High = "high",
  Low = "low",
  Normal = "normal",
}
const ListCard = ({
  id,
  title,
  account,
  types,
  emergency,
  cardId,
  image,
}: ListCardProps) => {
  const convertType = (emergency: string) => {
    switch (emergency) {
      case EmergencyType.High:
        return <DoubleLeftOutlined className="rotate-90 text-red-600" />;
      case EmergencyType.Low:
        return <DoubleLeftOutlined className="-rotate-90 text-blue-600" />;
      case EmergencyType.Normal:
        return <LineOutlined className="text-yellow-300" />;
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-sm shadow-sm px-5 py-3 mb-1">
      <h3 className="text-slate-600 font-bold">{title}</h3>
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          {convertType(emergency)}
          <span className="text-sm text-slate-400">{cardId}</span>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <span className="text-sm text-slate-400">{account}</span>
          <img className="w-8 h-8 rounded-full" src={image} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default ListCard;
