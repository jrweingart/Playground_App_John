export interface ISprite {
    front_default: string;
}

export interface IPokemon {
    sprites: ISprite;
    name: string;
}

export interface IPokemonGetResponse {
    data: IPokemon;
    status: number;
}