export { actions as moviesActions } from './slice';
export { default as moviesReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { moviesEpic, getMoviesAsyncEpic, addMovieReviewsAsyncEpic } from './epics';

export const moviesEpics = combineEpics( getMoviesAsyncEpic, addMovieReviewsAsyncEpic);
