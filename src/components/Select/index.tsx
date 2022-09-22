import { useState, useMemo } from "react";

import { ArrowSelect } from "@assets";
import { capitalizeFirstLetter } from "@utils";

import * as S from "./styles";

type Props = {
  data: { name: string; icon?: string; color?: string; id: number }[];
  value: number | null;
  isLoading: boolean;
  onSelect: (value: number) => void;
};

export function Select({ data, value, isLoading, onSelect }: Props) {
  const [isActive, setIsActive] = useState(false);

  const onSelectHandler = (newValue: number) => {
    setIsActive(false);
    if (value === newValue) return;
    onSelect(newValue);
  };

  const currentValue = useMemo(
    () => data.find((item) => item.id === value),
    [data, value]
  );

  return (
    <>
      {isActive && <S.Overlay onClick={() => setIsActive(false)} />}
      <S.Container isActive={isActive}>
        <S.Selected
          isActive={isActive}
          isLoading={isLoading}
          onClick={() => !isLoading && setIsActive((prev) => !prev)}
        >
          Show:{" "}
          <span>
            {currentValue ? capitalizeFirstLetter(currentValue.name) : "-"}
          </span>
          <img src={ArrowSelect} alt="expand" />
        </S.Selected>

        {isActive && (
          <S.ListWrapper>
            <S.List>
              {data.map((item) => (
                <S.Option color={item.color} key={item.id}>
                  <button onClick={() => onSelectHandler(item.id)}>
                    {item.icon && <img src={item.icon} />}
                    {capitalizeFirstLetter(item.name)}
                  </button>
                </S.Option>
              ))}
            </S.List>
          </S.ListWrapper>
        )}
      </S.Container>
    </>
  );
}
