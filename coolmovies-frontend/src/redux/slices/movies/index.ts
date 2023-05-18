export { actions as moviesActions } from './slice';
export { default as moviesReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { getMoviesAsyncEpic, addMovieReviewsAsyncEpic, updateMovieReviewAsyncEpic } from './epics';

export const moviesEpics = combineEpics( getMoviesAsyncEpic, addMovieReviewsAsyncEpic, updateMovieReviewAsyncEpic);
