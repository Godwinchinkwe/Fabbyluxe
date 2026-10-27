import { getProducts, getProduct, getCategories } from './api';

export const loadProducts = async (params = '') => {
  try {
    const data = await getProducts(params);

    return (data.products || []).map((product) => ({
      ...product,
      id: product.id || product._id,
    }));
  } catch (error) {
    console.error('Failed to load products from ShopHub API:', error);

    throw new Error(
      'Unable to load products. Please check your internet connection or try again later.'
    );
  }
};

export const loadProduct = async (id) => {
  try {
    const data = await getProduct(id);

    if (!data.product) {
      throw new Error('Product not found');
    }

    return {
      ...data.product,
      id: data.product.id || data.product._id,
    };
  } catch (error) {
    console.error(`Failed to load product ${id}:`, error);

    throw new Error(
      'Unable to load this product. Please try again later.'
    );
  }
};

export const loadCategories = async () => {
  try {
    const data = await getCategories();

    return (data.categories || []).map((category) => ({
      ...category,
      id: category.id || category._id,
    }));
  } catch (error) {
    console.error(
      'Failed to load categories from ShopHub API:',
      error
    );

    throw new Error(
      'Unable to load categories. Please try again later.'
    );
  }
};