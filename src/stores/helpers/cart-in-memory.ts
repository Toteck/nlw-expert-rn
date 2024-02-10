import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

// eu preciso de products aqui para verificar se o produto já foi adicionado porque se já tiver sido adicionado eu só incremento a quantidade dele
export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id);

  // Se o produto já existe então eu só incremento a quantidade dele
  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  // Caso o produto não exista então retornamos todos os produtos que já estão selecionados e juntos esse novo produto.
  return [...products, { ...newProduct, quantity: 1 }];
}

export function remove(products: ProductCartProps[], productRemoveId: string) {
  const updatedProducts = products.map((product) =>
    product.id === productRemoveId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  );

  return updatedProducts.filter((product) => product.quantity > 0);
}
