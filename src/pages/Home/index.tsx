import { PokemonContextProvider } from "@context";

import { Content, Footer, Header, Search } from "./components";

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
