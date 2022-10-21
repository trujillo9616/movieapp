import Image from "next/image";
import { getGenres } from "../utils/helper";
import moment from "moment";
import StarRatings from "react-star-ratings";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster_path,
  release_date,
  genre_ids,
  vote_average,
}) => {
  return (
    <>
      <div className="card">
        <div className="card__image">
          <Image
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "/missingMovie.png"
            }
            alt={`${title} Poster`}
            layout="intrinsic"
            width={200}
            height={300}
            placeholder="blur"
            blurDataURL={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "/missingMovie.png"
            }
            priority
          />
        </div>
        <Link href={`/movies/${id}`}>
          <a>
            <div className="card__content">
              <div className="card__label">
                <label>Movie</label>
              </div>
              <div className="card__description">
                <label className="card__year">
                  {moment(release_date).year()}
                </label>
                <label className="card__title">{title}</label>
                <div className="card__rating">
                  <StarRatings
                    rating={vote_average / 2}
                    starRatedColor="rgb(168 85 247)"
                    numberOfStars={5}
                    name="rating"
                    starDimension="10px"
                    starSpacing="2px"
                  />
                </div>
                <label className="card__genres">{getGenres(genre_ids)}</label>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
