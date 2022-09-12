import * as S from "./styles";

type Props = {
  size?: number;
  color?: string;
};

export function Loader({ size, color }: Props) {
  return <S.Container size={size} color={color} />;
}
