import React, { useState } from "react";
import { css } from '@emotion/react';
import {
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { exampleActions, useAppDispatch, useAppSelector, moviesActions } from '../../redux';

import { Movie } from '../../types';

interface MovieItemProps {
  data: Movie,
  addReviewDispatch?: any,
}

const MovieItem = ({ data }: MovieItemProps) => {
  
  const dispatch = useAppDispatch();
  // console.log("ASD-asd: ", data);

  const [reviewText, setReviewText] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddReview = () => {
    // addReviewDispatch({ userId: "123", movieId: data.id, reviewText});
    dispatch(moviesActions.addReview({ data: { userId: "123", movieId: data.id, reviewText} }));
    setReviewText("");
  }

  const handleEditReview = (reviewId: string) => {
    dispatch(moviesActions.editReview({ data: { reviewId, movieId: data.id, newReviewText: "TEST EDIT" } }));
  }

  return (
    <div key={data.id} css={styles.container}>
      <img width="259" src={data.imgUrl} />
      <div css={styles.movieData}>

        <Typography variant={'h4'} css={styles.title}>
          {data.title}
        </Typography>
      
        <span>Reviews</span>
        <ul css={styles.reviewList}>
          {
            data.reviews.map((review) => (
              <li key={review.id}>
                <p>{review.userByUserReviewerId.name}</p>
                <p>{review.title}</p>
                <p>{review.body}</p>
                <Button onClick={() => handleEditReview(review.id)}>
                  <img width="30" src="/edit.svg" />
                </Button>
              </li>
            ))
          }
        </ul>

        <div css={styles.reviewContainer}>
          <TextField
            css={styles.dataInput}
            multiline
            rows={3}
            label={'Your review'}
            value={reviewText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setReviewText(event.target.value);
            }}
          />
          <Button 
            variant={'outlined'}
            onClick={() => handleAddReview()}
          >
            Add Review
          </Button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: css({
    display: "flex",
    
  }),
  movieData: css({
    padding: "0 15px",
  }),
  title: css({
    margin: "0 0 15px 0",
  }),
  reviewContainer: css({
    display: "flex",
    flexDirection: "column",
  }),
  reviewList: css({
    overflowY: "scroll",
  }),
  dataInput: css({
    alignSelf: 'stretch',
    width: "400px",
    margin: '32px 0',
  }),
};

export default MovieItem;
