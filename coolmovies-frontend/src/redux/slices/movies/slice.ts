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
      
      const normalizedData = action.payload.data.allMovies.nodes.map((movieItem) => {
        const normalizedMovie = {
          ...movieItem,
          reviews: movieItem.movieReviewsByMovieId.edges.map((reviewItem) => ({ ...reviewItem.node }))
        }

        delete normalizedMovie.movieReviewsByMovieId;

        return normalizedMovie;
      })
      
      state.moviesList = normalizedData;
    },
    loadError: (state) => {
      state.moviesList = ['Error Fetching :('];
    },
    createReview: (state, action: PayloadAction<{ data: {
      title: string,
      body: string,
      rating: number,
      movieId: string,
    }}>) => {
      console.log("TTT: ", action.payload.data.title);
    },
    addReview: (state, action: PayloadAction<{ data: {
      id: string,
      title: string,
      body: string,
      rating: number,
      movieId: string,
      userReviewerId: string,
      userReviewerName: string,
    }}>) => {
      const newMoviesList = state.moviesList.map((movie) => {
        if(movie.id === action.payload.data.movieId){
          return {
            ...movie,
            reviews: [ ...movie.reviews, {
              id: action.payload.data.id,
              body: action.payload.data.body,
              movieId: action.payload.data.movieId,
              rating: action.payload.data.rating,
              title: action.payload.data.title,
              userByUserReviewerId: {
                id: action.payload.data.userReviewerId,
                name: action.payload.data.userReviewerName
              }
            }]
          }
        } else {
          return movie;
        }
      });

      state.moviesList = newMoviesList;
    },
    editReview: (state, action: PayloadAction<{ data: unknown[] }>) => {
      
    },
    test: (state, action: PayloadAction<{ data: any }>) => {
      console.log("XZXX: ADD REVIEW");
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
