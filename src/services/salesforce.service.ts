import { type ICartModel, type ICartItemType } from '../models/cart.js';
export const defalutCartExpireTimeInSeconds: number = 20;

export class SFCartService {
  private cartMap = new Map<string, ICartModel>();

  public addNewCart(expireTimeInSeconds: number = 0) {
    const newCartRefID = crypto.randomUUID();
    this.cartMap.set(newCartRefID, {
      id: newCartRefID,
      items: [],
      total: 0,
      expiresAt: expireTimeInSeconds
    });
    if (expireTimeInSeconds > 0) {
      this.setExpiresTime(newCartRefID, expireTimeInSeconds);
    }
    return this.getCartById(newCartRefID);
  }

  public getCartById(cartId: string) {
    const cart = this.cartMap.get(cartId);
    if (cart) {
      cart.total = this.calculateTotal(cart.items);
    }
    return cart;
  }

  public addItemsToCart(cartId: string, items: Array<ICartItemType>) {
    const cart = this.cartMap.get(cartId);
    if (cart && items.length > 0) {
      for (const item of items) {
        const existingItem = cart.items.find(cartItem => Object.is(cartItem.id, item.id));
        if (existingItem) {
          existingItem.count = (existingItem.count || 0) + 1;
        } else {
          item.count = 1;
          cart.items.push(item);
        }
      }
    }
    return this.getCartById(cartId);
  }

  public removeItemToCart(cartId: string, itemId: string) {
    const cart = this.cartMap.get(cartId);
    if (cart) {
      const removeId = parseInt(itemId, 10),
        cartItemIndx = cart.items.findIndex(item => Object.is(item.id, removeId)),
        exitingItem = cart.items[cartItemIndx];
      if (exitingItem) {
        const { count } = exitingItem;
        if (count && count > 1) {
          exitingItem['count'] -= 1;
        } else {
          cart.items.splice(cartItemIndx, 1);
        }
      }
    }
    return this.getCartById(cartId);
  }

  public removeCartById(cartId: string) {
    if (this.cartMap.has(cartId)) {
      this.cartMap.delete(cartId);
    }
  }

  protected calculateTotal(cartItems?: Array<Partial<ICartItemType>>) {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      return cartItems.reduce((acc, item) => {
        return acc + ((item.price || 0) * (item.count || 1));
      }, 0);
    }
    return 0;
  }

  private setExpiresTime(cartId: string, timeSeconds: number) {
    const expireFunction = setTimeout(() => {
      this.removeCartById(cartId);
      clearTimeout(expireFunction);
    }, timeSeconds * 1000);
  }
};