import { ActivityIndicator, View } from "react-native";
// Usaremos exportação nomeada porque ele não será usado pelo expo router
// Podemos pegar a cor de dentro do tailwind e passar aqui dessa forma:
import colors from "tailwindcss/colors";
export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <ActivityIndicator color={colors.white} />
    </View>
  );
}
