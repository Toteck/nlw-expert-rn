import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";
// Pressable é tipo um botão só que sem o efeito de opacidade
// PressableProps seria a tipagem do Pressable

type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean; // verificar se a categoria está selecionada ou não
}; // O meu categoryProps agora tem todas as tipagens de PressableProps e essa customizada que eu fiz
// ...rest: Todas as tipagens que eu não extrair explicitamente coloque dentro do componente. E podemos passar todas as propriedades para dentro do pressable e assim poder usar essa propriedade no uso do componente lá no arquivo index.tsx

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
  return (
    <Pressable
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10",
        isSelected && "border-2 border-lime-300"
      )}
      {...rest}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}
