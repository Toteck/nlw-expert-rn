import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from "./helpers/cart-in-memory";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
};

export const useCartStore = create<StateProps>((set) => ({
  products: [],

  add: (product: ProductProps) =>
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    })),
}));

// estamos passando o método de add dizendo que ele vai receber um produto do tipo ProductProps. O set é o método do zustando para alterar o estado. A nossa função add irá retornar os nossa lista de  produtos atualizada.
