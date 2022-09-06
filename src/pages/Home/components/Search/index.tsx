import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as S from "./styles";

export function Search() {
  const [search, setSearch] = useState("");

  return (
    <S.Container>
      <S.Wrapper>
        <h2>Select your Pokémon</h2>

        <S.InputWrapper>
          <input
            type="text"
            placeholder="Search name or code"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
          />
          <button disabled={!search}>
            <AiOutlineSearch />
          </button>
        </S.InputWrapper>
      </S.Wrapper>
    </S.Container>
  );
}
