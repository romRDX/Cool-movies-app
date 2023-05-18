import React, { useState } from "react";
import { css } from '@emotion/react';
import {
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, moviesActions } from '../../redux';

import { Movie } from '../../types';

interface MovieItemProps {
  data: Movie,
  addReviewDispatch?: any,
}

const MovieItem = ({ data }: MovieItemProps) => {
  
  const dispatch = useAppDispatch();

  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewBody, setReviewBody] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddReview = () => {
    
    dispatch(moviesActions.createReview({ data: {
      title: reviewTitle,
      body: reviewBody,
      rating: reviewRating,
      movieId: data.id,
    }}));

    setReviewTitle("");
    setReviewBody("");
  }

  const handleEditReview = (reviewId: string) => {
    // dispatch(moviesActions.editReview({ data: { reviewId, movieId: data.id, newReviewText: "TEST EDIT" } }));
  }

  return (
    <div key={data.id} css={styles.container}>
      <img width="259" src={data.imgUrl} />
      <div css={styles.movieData}>
        <div>
          <Typography variant={'h4'} css={styles.title}>
            {data.title}
          </Typography>
        
          <span>Reviews</span>
          <ul css={styles.reviewList}>
            {
              data.reviews.map((review) => (
                <li key={review.id} css={styles.reviewItem} >
                  <div css={styles.reviewTitle} >
                    <p>{review.userByUserReviewerId.name}</p>
                    <p>{review.title}</p>
                    <p>rating: {review.rating}</p>
                    <Button onClick={() => handleEditReview(review.id)} css={styles.reviewEditButton}>
                      <img width="30" src="/edit.svg" />
                    </Button>
                  </div>
                  <p>{review.body}</p>
                </li>
              ))
            }
          </ul>
        </div>
        <div css={styles.reviewContainer}>
          <TextField
            css={styles.dataInput}
            rows={1}
            label={'Your review title'}
            value={reviewTitle}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setReviewTitle(event.target.value);
            }}
          />
          <TextField
            type="number"
            InputProps={{
              inputProps: { 
                max: 5, min: 0 
              }
            }}
            css={styles.dataInput}
            rows={1}
            label={'Your review rating'}
            value={reviewRating}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              var value = parseInt(event.target.value, 10);

              if (value > 5) value = 5;
              if (value < 0) value = 0;
              setReviewRating(value);
            }}
          />
          <TextField
            css={styles.dataInput}
            multiline
            rows={3}
            label={'Your review text'}
            value={reviewBody}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setReviewBody(event.target.value);
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
    marginBottom: "20px",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid lightgray",
    borderRadius: "10px",
    width: "fit-content"
  }),
  movieData: css({
    padding: "0 15px",
    display: "flex",
  }),
  title: css({
    margin: "0 0 15px 0",
  }),
  reviewContainer: css({
    display: "flex",
    flexDirection: "column",
    margin: "40px 0 0 15px",
  }),
  reviewList: css({
    overflowY: "scroll",
    width: "500px",
    height: "400px",
    listStyle: "none",
    padding: "10px",
  }),
  reviewItem: css({
    paddingBottom: "10px",
    borderBottom: "2px solid lightgray",

  }),
  reviewTitle: css({
    display: "flex",
    gap: "15px",
  }),
  reviewEditButton: css({
    marginLeft: "auto",
  }),
  dataInput: css({
    alignSelf: 'stretch',
    width: "500px",
    margin: '32px 0',
  }),
};

export default MovieItem;
