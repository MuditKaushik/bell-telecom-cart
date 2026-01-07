import { Router } from 'express';
import { SFCartService } from '../../services/salesforce.service.js';

const cartHandler = Router(),
  salesforceCart = new SFCartService();

cartHandler.get('/new', (req, res, next) => {
  const expireTime = parseInt(req.query['expirySeconds'] as string, 10),
    cartTTL = isNaN(expireTime) ? 0 : expireTime;
  res.status(200).send({ cart: salesforceCart.addNewCart(cartTTL) });
});

cartHandler.get('/:cartId', (req, res, next) => {
  const cartId = req.params.cartId;
  if (!cartId) {
    res.status(401).send({ error: 'Cart id not provided.' });
    return;
  }
  const cart = salesforceCart.getCartById(cartId);
  res.status(200).send({ cart: cart });
});

cartHandler.post('/:cartId/additems', (req, res, next) => {
  const cartId = req.params.cartId,
    cartItems = req.body;
  if (!cartItems || !cartId) {
    res.status(401).send({ error: 'Cart item or cart id not provided.' });
    return;
  }
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    res.status(200).send({ cart: salesforceCart.addItemsToCart(cartId, cartItems) });
    return;
  }
  res.status(401).send({ error: 'Bad Request to add item to cart.' });
});

cartHandler.delete('/remove/:cartId/item/:itemId', (req, res, next) => {
  const { cartId, itemId } = req.params;
  if (!cartId || !itemId) {
    res.status(401).send({ error: 'Cart Id or Item Id not provided.' });
    return;
  }
  res.status(200).send({ cart: salesforceCart.removeItemToCart(cartId, itemId) });
});

cartHandler.delete('/remove/:cartId', (req, res, next) => {
  const { cartId } = req.params;
  if (!cartId) {
    res.status(401).send({ error: 'Cart ID not provided.' });
    return;
  }
  res.status(200).send({ cart: salesforceCart.removeCartById(cartId) });
});

export { cartHandler };