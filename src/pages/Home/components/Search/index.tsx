import { usePokemon } from "@context";
import { AiOutlineSearch } from "react-icons/ai";
import * as S from "./styles";

export function Search() {
  const { onSubmitSearchHandler, search, setSearch } = usePokemon();

  return (
    <S.Container>
      <S.Wrapper>
        <h2>Select your Pokémon</h2>

        <S.Form onSubmit={onSubmitSearchHandler}>
          <input
            type="text"
            placeholder="Search name or code"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
          />
          <button disabled={!search}>
            <AiOutlineSearch />
          </button>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
}
