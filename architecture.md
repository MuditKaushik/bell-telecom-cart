# Architectural Blueprint
   The Experience API sits between the Digital Channel and the Salesforce System API.

# Key Components:
  State Management: Since Salesforce context is non-persistent, the xAPI should use a fast cache (like Redis) or temporary LocalStorage to maintain the carts.

# Implementation Strategy
  1. The Endpoint Design
     Keep the interface RESTful and resource-oriented.

     * GET /cart/new	:Initializes a new cart context in Salesforce.
     * GET /cart/{id}	:Retrieves a simplified view of items and totals.
     * POST	/cart/{id}/items :Add items to the cart.
     * DELETE /cart/remove/{cartId} :Remove cart.
     * DELETE /cart/remove/{cartId}/item/{itemId} :Remove specific item from cart.