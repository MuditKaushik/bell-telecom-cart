import { Router } from 'express';
import { cartHandler } from './cart/cart.js';
import { productHandler } from './product/product.js';

const handlerRoutes = Router({ strict: true })
  .use('/cart', cartHandler)
  .use('/product', productHandler);

export { handlerRoutes };