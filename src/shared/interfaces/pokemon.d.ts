export interface IType {
  type: string;
}

export interface IPokemonType {
  type: string;
  icon: string;
  color: string;
}

export interface IPokemon {
  name: string;
  image: string;
  type: string;
  id: number;
}
