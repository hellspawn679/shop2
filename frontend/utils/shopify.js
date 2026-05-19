export async function fetchProducts() {
  try {
    const res = await fetch('/products.json');
    if (!res.ok) throw new Error('Failed to fetch Shopify products');
    const data = await res.json();
    
    // Map Shopify products to the format the React app expects
    return data.products.map(product => {
      return {
        id: product.variants[0].id.toString(), // We need the variant ID for adding to cart
        name: product.title,
        price: parseFloat(product.variants[0].price),
        image: product.images && product.images.length > 0 ? product.images[0].src : '',
        status: product.variants[0].available ? 'IN_STOCK' : 'SOLD_OUT',
        type: product.product_type || 'APPAREL'
      };
    });
  } catch (error) {
    console.error('Shopify fetch error:', error);
    return [];
  }
}

export async function addToCart(variantId, quantity = 1) {
  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{
          id: parseInt(variantId),
          quantity: quantity
        }]
      })
    });
    if (!res.ok) throw new Error('Failed to add to cart');
    return await res.json();
  } catch (error) {
    console.error('Shopify add to cart error:', error);
    throw error;
  }
}
