import { IType } from "@interfaces";

export type GetTypes = () => Promise<{ data: IType[] }>;

export interface IUsePokeapi {
  getTypes: GetTypes;
}
