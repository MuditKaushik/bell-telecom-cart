export type IDiscountType = {
  id: string;
  percent: number;
  flat: number;
};

export type ICartItemType = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  count: number;
  discount?: Partial<IDiscountType>;
};

export interface ICartModel {
  id: string;
  items: Array<Partial<ICartItemType>>;
  total: number;
  expiresAt: number;
};
