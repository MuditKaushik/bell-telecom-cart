# Below Node Server API Endpoints:
  # GET
  1. `/api/cart/new?expirySeconds=<number>` - To create a new cart and query param 'expirySeconds' to dicard cart.
  2. `/api/cart/:cartId` - To fetch cart and its items and total by `:cartId`.
  # POST:
  3. POST: `/api/cart/:cartId/additems` - To add item in an existing cart with `:cartId`.
  # DELETE:
  4. DELETE: `/api/cart/remove/:cartId/item/:itemid` - To remove item with `:itemId` from cart with `:cartId`.
  5. DELETE: `/api/cart/remove/:cartId` - To remove compelete cart by `:cartId`.