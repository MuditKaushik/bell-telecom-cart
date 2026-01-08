import { describe, jest, test, beforeAll, afterAll, expect } from '@jest/globals';
import { SFCartService } from './salesforce.service';
import items from '../mock/items.json' with {type: 'json'};

/** This mock will be helpfull to stub and mock actual Salesforce APIs. */
// jest.mock('./salesforce.service', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       addNewCart: jest.fn(),
//       getCartById: jest.fn(),
//       addItemsToCart: jest.fn(),
//       removeItemToCart: jest.fn(),
//       removeCartById: jest.fn()
//     }
//   });
// });

describe("SalesForce Thin Cart Context Test", () => {
  let sfCartInstance: SFCartService | null = null,
    cartId = String(),
    mockItems: Array<any> = [items[0]];
  beforeAll(() => {
    jest.spyOn(SFCartService.prototype, 'getCartById');
    jest.spyOn(SFCartService.prototype, 'addNewCart');
    jest.spyOn(SFCartService.prototype, 'addItemsToCart');
    jest.spyOn(SFCartService.prototype, 'removeItemToCart');
    jest.spyOn(SFCartService.prototype, 'removeCartById');
    sfCartInstance = new SFCartService();
  });

  afterAll(() => {
    sfCartInstance?.removeCartById(cartId || '');
    sfCartInstance = null;
    jest.clearAllMocks();
  });

  test("Should create new Cart with UniqueID", () => {
    const newCart = sfCartInstance?.addNewCart();
    expect(newCart).toHaveProperty('id');
    expect(newCart).toHaveProperty('items');
    expect(newCart).toHaveProperty('total');
    expect(newCart?.id).not.toBeNull();
    expect(sfCartInstance?.addNewCart).toHaveBeenCalledTimes(1);
    expect(sfCartInstance?.getCartById).toHaveBeenCalledTimes(1);
    cartId = newCart?.id || '';
  });

  test("Should get cart by Id", () => {
    const cart = sfCartInstance?.getCartById(cartId);
    expect(cart).toBeDefined();
    expect(cart?.id).toEqual(cartId);
    expect(sfCartInstance?.getCartById).toHaveBeenCalledTimes(2);
  });

  test("Should add new Item to new Cart", () => {
    const cart = sfCartInstance?.addItemsToCart(cartId, mockItems);
    expect(cart).toBeDefined();
    expect(sfCartInstance?.addItemsToCart).toHaveBeenCalledTimes(1);
    expect(sfCartInstance?.getCartById).toHaveBeenCalled();
    expect(cart?.items.length).toBeGreaterThan(0);
    expect(cart?.items[0].id).toBeDefined();
  });

  test("Should remove Item from cart", () => {
    const existingCart = sfCartInstance?.getCartById(cartId),
      existingItemCount = existingCart?.items.length;
    const cart = sfCartInstance?.removeItemToCart(cartId, mockItems[0].id);
    expect(cart).toBeDefined();
    expect(sfCartInstance?.removeItemToCart).toHaveBeenCalledTimes(1);
    expect(cart?.items.length).toBeLessThan(existingItemCount as number);
  });

  test("Should remove cart by cartId", () => {
    const cart = sfCartInstance?.removeCartById(cartId);
    expect(cart).toBeFalsy();
    expect(sfCartInstance?.removeCartById).toHaveBeenCalledTimes(1);
  });
});