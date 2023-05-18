import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';
import { v4 as uuidv4 } from "uuid";

export const moviesEpic: Epic = (
  action$: Observable<SliceAction['addReview']>,
  state$: StateObservable<RootState>
) => action$.pipe(
  filter(actions.addReview.match),
  filter(() => Boolean(state$.value.movies.value % 2)),
);

export const getMoviesAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
  ) => action$.pipe(
    filter(actions.fetch.match),
    switchMap(async (x) => {
      try {
        const result = await client.query({
          query: getMoviesQuery,
        });
        
        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

export const addMovieReviewsAsyncEpic: Epic = (
  action$: Observable<SliceAction['createReview']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
  ) => action$.pipe(
    filter(actions.createReview.match),
    switchMap(async (response) => {
      try {
        
        const id = uuidv4();
        const reviewerId = "5f1e6707-7c3a-4acd-b11f-fd96096abd5a";
        const result = await client.mutate({
          mutation: mutation,
          variables: {
            input: {
              clientMutationId: "123",
              movieReview: {
                id,
                title: response.payload.data.title,
                body: response.payload.data.body,
                rating: response.payload.data.rating,
                movieId: response.payload.data.movieId,
                userReviewerId: reviewerId,
              }
            }
          }
        });

        return actions.addReview({ data: {
          id,
          title: response.payload.data.title,
          body: response.payload.data.body,
          rating: response.payload.data.rating,
          movieId: response.payload.data.movieId,
          userReviewerId: reviewerId,
          userReviewerName: result.data.createMovieReview.userByUserReviewerId.name
        }});
      } catch (err) {
        return actions.loadError();
      }
    })
  );

  const mutation = gql`
  mutation createMovieReview($input: CreateMovieReviewInput!) {
    createMovieReview(input: $input) {
      clientMutationId
      movieReview {
        id
      }
      movieByMovieId {
        id
      }
      userByUserReviewerId {
        id
        name
      }
    }
  }
  `;

const getMoviesQuery = gql`
  query AllMovies {
    allMovies {
      nodes {
        id
        imgUrl
        movieDirectorId
        userCreatorId
        title
        releaseDate
        nodeId
        userByUserCreatorId {
          id
          name
          nodeId
        }
        movieReviewsByMovieId {
          edges {
            node {
              id
              body
              title
              rating
              movieId
              userByUserReviewerId {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;