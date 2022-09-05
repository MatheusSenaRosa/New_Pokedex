interface IType {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

interface Result {
  name: string;
  url: string;
}

export type GetTypes = () => Promise<IType>;

export interface IUsePokeapi {
  getTypes: GetTypes;
}
