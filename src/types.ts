export interface Config {
    width?: number;
    ex?: number;
    em?: number;
    css?: string;
    inline?: boolean;
    scale?: number;
}

export type Recipe = {
    tex?: string;
} & Config;

export type Recipes = {
    tex?: string[] | string;
    key?: boolean;
} & Config;
