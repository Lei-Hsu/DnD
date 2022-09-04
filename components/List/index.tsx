import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import ListCard, { ListCardProps } from 'components/Card/listCard';

interface ListProps {
  id: number;
  title: string;
  total: number;
  data?: ListCardProps[];
}

const List = ({ title, total, data, id }: ListProps) => {
  return (
    <div className="bg-slate-100 rounded-sm min-h-[500px] max-h-[1000px]">
      <div className="px-5 py-2 text-slate-500 flex justify-between">
        <p>{title}</p>
        {/* <span>{total}</span> */}
        <span>{data?.length || 0}</span>
      </div>
      <main className="flex flex-col gap-1 p-1">
        <Droppable droppableId={`${id}`} key={id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {provided.placeholder}
              {data?.map((item, index) => (
                <div key={item.cardId} className="cursor-pointer w-full h-fit">
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListCard
                          title={item.title}
                          account={item.account}
                          types={item.types}
                          emergency={item.emergency}
                          cardId={item.cardId}
                          image={item.image}
                          id={item.id}
                        />
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
            </div>
          )}
        </Droppable>
      </main>
    </div>
  );
};

export default List;
