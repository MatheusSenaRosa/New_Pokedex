import { PokemonContextProvider } from "@context";
import { Content, Footer, Header, Search } from "./components";

export function Home() {
  return (
    <PokemonContextProvider>
      <Header />
      <Search />
      <Content />
      <Footer />
    </PokemonContextProvider>
  );
}
