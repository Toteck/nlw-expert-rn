// Definir as configurações da navegação
// O expo irá identificar que é um arquivo de configuração por meio do _layout.tsx

// Para eu repassar a configuração para as demais rotas da aplicação eu preciso usar o Slots
import { Slot } from "expo-router";
// Podemos importar o SafeAreaView que é tipo uma view só que para escapar de detalhes físicos tipo do iphone que tem aquele entalhe gigantesco então ele já da uma margem
import { SafeAreaView } from "react-native";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

import { Loading } from "@/components/loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  }); // Precisamos garantir que as fontes estejam carregados antes de iniciar o app e para isso atribuimos a uma variável
  // Caso as fontes não tenha sido carregados não retorne nada
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Slot />
    </SafeAreaView>
  );
}
