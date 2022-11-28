import { Content, Footer, Header, Search } from "./components";
import { PokemonContextProvider } from "./context";

function HomeComponent() {
  return (
    <>
      <Header />
      <Search />
      <Content />
      <Footer />
    </>
  );
}

export function Home() {
  return (
    <PokemonContextProvider>
      <HomeComponent />
    </PokemonContextProvider>
  );
}
