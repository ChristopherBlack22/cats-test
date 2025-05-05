export type NextDeliveryMsgType = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

export type PouchSizeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type CatType = {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: PouchSizeType;
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: CatType[];
};
