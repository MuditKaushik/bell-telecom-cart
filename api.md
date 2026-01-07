# Below Node Server API Endpoints:
1. `/api/cart/new?expirySeconds=<number>` - To create a new cart and query param 'expirySeconds' to dicard cart and its item when expires.
2. `/api/cart/:cartId` - To fetch cart and its items and total by `:cartId`.
3. `/api/cart/:cartId/additems` - To add item in an existing cart with `:cartId`.
4. `/api/cart/remove/:cartId/item/:itemid` - To remove item with `:itemId` from cart with `:cartId`.
5. `/api/cart/remove/:cartId` - To remove compelete cart by `:cartId`.