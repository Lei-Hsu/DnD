import { ListCardProps } from 'components/Card/listCard';

import type { NextApiRequest, NextApiResponse } from 'next'

interface DndCardList {
  id: number;
  title: string;
  number: number;
  data: ListCardProps[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DndCardList[]>
) {
  res.status(200).json([
    {
      id: 1,
      title: "TO DO",
      number: 0,
      data: [
      ],
    }, {
      id: 2,
      title: "IN PROGRESS",
      number: 0,
      data: [
        {
          id: 3,
          title: "Implement Network12",
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
      id: 3,
      title: "DONE",
      number: 0,
      data: [
        {
          id: 4,
          title: "Implement Network",
          account: "John Doe",
          types: "personal",
          emergency: "low",
          cardId: "NUC-3",
          image:
            "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
        },
      ],
    },
    {
      id: 4,
      title: "READY TO DELETE",
      number: 0,
      data: [
        {
          id: 1,
          title: "Implement Redux",
          account: "John Doe",
          types: "work",
          emergency: "high",
          cardId: "NUC-1",
          image:
            "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
        },
        {
          id: 2,
          title: "Implement Network",
          account: "John Doe",
          types: "personal",
          emergency: "normal",
          cardId: "NUC-7",
          image:
            "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
        },
        {
          id: 5,
          title: "Implement Network1",
          account: "John Doe",
          types: "personal",
          emergency: "low",
          cardId: "NUC-4",
          image:
            "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
        },
        {
          id: 6,
          title: "Implement Network2",
          account: "John Doe",
          types: "personal",
          emergency: "low",
          cardId: "NUC-5",
          image:
            "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff",
        },
      ],
    },
  ])
}