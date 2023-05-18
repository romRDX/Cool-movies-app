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
    switchMap(async () => {
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
  action$: Observable<SliceAction['test']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
  ) => action$.pipe(
    filter(actions.test.match),
    switchMap(async () => {
      try {
        // const result = await client.query({
        //   query: getMoviesQuery,
          
        // });
        console.log("foi-1: ", actions);
        console.log("foi-2: ", states);
        const id = uuidv4();
        const result = await client.mutate({
          mutation: mutation,
          variables: { input: {
            clientMutationId: uuidv4(),
            movieReview: {
              id: uuidv4(),
              title: "new title",
              body: "new body",
              rating: 3,
              movieId: uuidv4(),
              userReviewerId: uuidv4(),
            }
          }}
          
        });

        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

  const mutation = gql`
  mutation createMovieReview {
    createMovieReview {
      clientMutationId
      movieReview {
        id
      }
      movieByMovieId {
        id
      }
      userByUserReviewerId {
        id
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
                name
              }
            }
          }
        }
      }
    }
  }
`;