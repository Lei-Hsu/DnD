import React from 'react';

import { useAppDispatch } from 'hooks/hooks';

import { DoubleLeftOutlined, LineOutlined } from '@ant-design/icons';
import { openEditCardModal } from '@Redux/slices/global/globalSlice';
import { openCard } from '@Redux/slices/main/mainSlice';

export type emergencyType = "high" | "low" | "normal";

export interface ListCardProps {
  id: number;
  title: string;
  account: string;
  types: string;
  emergency: emergencyType;
  cardId: string;
  image?: string;
}

export enum EmergencyTypeEnum {
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
  const dispatch = useAppDispatch();

  const convertType = (emergency: string) => {
    switch (emergency) {
      case EmergencyTypeEnum.High:
        return <DoubleLeftOutlined className="rotate-90 text-red-600" />;
      case EmergencyTypeEnum.Low:
        return <DoubleLeftOutlined className="-rotate-90 text-blue-600" />;
      case EmergencyTypeEnum.Normal:
        return <LineOutlined className="text-yellow-300" />;
      default:
        return "bg-blue-500";
    }
  };

  const handleClickOpenCard = () => {
    dispatch(openCard({ id }));
    dispatch(
      openEditCardModal({
        visible: true,
        type: "edit",
        width: 1000,
        title: "編輯事項",
      })
    );
  };

  return (
    <div
      className="bg-white rounded-sm shadow-sm px-5 py-3 mb-1"
      onClick={handleClickOpenCard}
    >
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
