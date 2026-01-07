import { Router } from 'express';
import productList from '../../mock/items.json' with {type: 'json'};

const productHandler = Router();

productHandler.get('/list', (req, res, next) => {
  res.status(200).send({ products: productList });
  return;
});

export { productHandler };