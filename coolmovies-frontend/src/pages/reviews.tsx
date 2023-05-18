import React, { useEffect } from "react";
import { css } from '@emotion/react';
import {
  Button,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector, moviesActions } from '../redux';
import MovieItem from "../components/movieReviewItem/movieReviewItem";

const primary = '#1976d2';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const moviesData = useAppSelector((state) => state.movies);

  useEffect(() => {
    // dispatch(
    //   exampleState.fetchData
    //     ? exampleActions.clearData()
    //     : exampleActions.fetch()
    // )

    dispatch(moviesActions.fetch());
    dispatch(moviesActions.test({ id: 1 }));
  }, [dispatch]);

  // dispatch(
  //   exampleState.fetchData
  //     ? exampleActions.clearData()
  //     : exampleActions.fetch()
  // )

  // console.log("ASD: ", moviesData.moviesList);

  return (
    <div css={styles.root}>
      <Paper elevation={3} css={styles.navBar}>
        <Typography>{'EcoPortal'}</Typography>
      </Paper>

      <div css={styles.body}>
        <Typography variant={'h1'} css={styles.heading}>
          {'Coolmovies Reviews'}
        </Typography>

        <div css={styles.mainControls}>

        </div>
        <div>
          {
            moviesData && moviesData.moviesList.map((data) => (
              <MovieItem data={data} key={data.id} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: css({
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  navBar: css({
    background: primary,
    height: 50,
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    borderRadius: 0,
    p: {
      color: 'white',
    },
  }),
  body: css({
    alignSelf: 'stretch',
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  heading: css({ marginTop: 16, fontSize: '2.75rem', textAlign: 'center' }),
  subtitle: css({
    fontWeight: 300,
    textAlign: 'center',
    maxWidth: 600,
    margin: '24px 0',
    color: 'rgba(0, 0, 0, 0.6)',
  }),
  mainControls: css({
    display: 'flex',
    alignItems: 'center',
    button: { marginRight: 16 },
  }),
  dataInput: css({
    alignSelf: 'stretch',
    width: "400px",
    margin: '32px 0',
  }),
};

export default Home;
