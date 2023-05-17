import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './types';

interface MoviesState {
  moviesList: Movie[];
}

const initialState: MoviesState = {
  moviesList: [],
};

export const slice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    fetch: () => {},
    clearData: (state) => {
      state.moviesList = [];
    },
    loaded: (state, action: PayloadAction<{ data: unknown[] }>) => {
      
      const normalizedData = action.payload.data.allMovies.nodes.map((movieItem) => ({
        ...movieItem,
        reviews: movieItem.movieReviewsByMovieId.edges.map((reviewItem) => ({ ...reviewItem.node }))
      }))
      console.log("ASD: ", normalizedData);
      state.moviesList = normalizedData;
    },
    loadError: (state) => {
      state.moviesList = ['Error Fetching :('];
    },
    addReview: (state, action: PayloadAction<{ data: unknown[] }>) => {

    },
    editReview: (state, action: PayloadAction<{ data: unknown[] }>) => {

    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
