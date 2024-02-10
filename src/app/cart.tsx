import { useState } from "react";

import { View, Text, ScrollView, Alert } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";

import { Feather } from "@expo/vector-icons";

import { Product } from "@/components/product";
import { Header } from "@/components/header";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    // Confirmar primeiro se o usuário quer deletar
    Alert.alert(
      "Remover",
      `Deseja remover ${product.title} produto do carrinho?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Remover",
          onPress: () => cartStore.remove(product.id),
        },
      ]
    );
  }

  // Primeiro verificar se o usuário digitou um endereço
  function handleOrder() {
    // Se igual a zero o usuário não digitou nada e tá tentando envia o pedido
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-6">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
              onChangeText={setAddress}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
