export async function fetchProducts() {
  try {
    const res = await fetch('/products.json');
    if (!res.ok) throw new Error('Failed to fetch Shopify products');
    const data = await res.json();
    
    // Map Shopify products to the format the React app expects
    return data.products.map(product => {
      // Find color options if any
      const colorOption = product.options ? product.options.find(opt => opt.name.toLowerCase() === 'color') : null;
      const colorCount = colorOption ? colorOption.values.length : 0;
      
      return {
        id: product.variants[0].id.toString(), // Default variant ID
        handle: product.handle,
        name: product.title,
        price: parseFloat(product.variants[0].price),
        image: product.images && product.images.length > 0 ? product.images[0].src : '',
        status: product.variants[0].available ? 'IN_STOCK' : 'SOLD_OUT',
        type: product.product_type || 'APPAREL',
        hasVariants: product.variants.length > 1,
        colorCount: colorCount
      };
    });
  } catch (error) {
    console.error('Shopify fetch error:', error);
    return [];
  }
}

export async function fetchProduct(handle) {
  try {
    const res = await fetch(`/products/${handle}.js`);
    if (!res.ok) throw new Error('Failed to fetch Shopify product');
    const product = await res.json();
    
    return {
      id: product.variants[0].id.toString(),
      handle: product.handle,
      name: product.title,
      price: parseFloat(product.variants[0].price) / 100, // .js endpoint returns price in cents
      images: product.images ? product.images.map(img => 'https:' + img) : [],
      description: product.description,
      status: product.available ? 'IN_STOCK' : 'SOLD_OUT',
      type: product.type || 'APPAREL',
      options: product.options || [],
      variants: product.variants.map(v => ({
        id: v.id.toString(),
        title: v.title,
        price: parseFloat(v.price) / 100,
        available: v.available,
        options: product.options.map((opt, index) => v[`option${index + 1}`]),
        featured_image: v.featured_image ? 'https:' + v.featured_image.src : null
      }))
    };
  } catch (error) {
    console.error('Shopify fetch product error:', error);
    return null;
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
