// Nós iremos precisar do useRef para poder manipular essa lista diretamente
import { useState, useRef } from "react";

import { Header } from "@/components/header";
import { View, Text, FlatList, SectionList } from "react-native";
import { CategoryButton } from "@/components/category-button";
import { Product } from "@/components/product";

// Vamos importar aqui também o MENU
import { CATEGORIES, MENU } from "@/utils/data/products";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  // Novo: Iremos aplicar o scroll aqui dentro dessa função aqui dentro já estamos selecionando a categoria
  // Novo: eu define o tipo para SectionList e o valor inicial é null
  const sectionListRef = useRef<SectionList>(null);
  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);
    // novo
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    // Novo
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça o seu pedido" cartQuantityItems={5} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef} // novo
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => <Product data={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
