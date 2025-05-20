import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const endpoint = 'https://graphqlpokemon.favware.tech/v8';

export interface Pokemon {
    key: string;
    num: number;
    species: string;
    sprite: string;
}

interface PokemonState {
    list: Pokemon[];
    loading: boolean;
    error: string | null;
}

const initialState: PokemonState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchPokemons = createAsyncThunk<Pokemon[]>('pokemon/fetchPokemons', async () => {
    const query = gql`
    query GetAllPokemon {
      getAllPokemon(offset: 92) {
        key
        num
        species
        sprite
      }
    }
  `;
    const data: any = await request(endpoint, query);
    return data.getAllPokemon;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default pokemonSlice.reducer;
