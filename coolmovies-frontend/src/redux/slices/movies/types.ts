export interface Review {
    id: string,
    userId: string,
    userName: string,
    movieId: string,
    text: string,
}
  
export interface Movie {
    id: string,
    imgUrl: string,
    movieDirectorId: string,
    releaseDate: string,
    title: string,
    reviews: Review[],
}