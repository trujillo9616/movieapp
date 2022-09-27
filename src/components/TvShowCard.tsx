import Image from "next/image";
import { getGenres } from "../utils/helper";
import moment from "moment";
import StarRatings from "react-star-ratings";
import Link from "next/link";

interface TvShowCardProps {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
}

const TvShowCard: React.FC<TvShowCardProps> = ({
  id,
  poster_path,
  name,
  first_air_date,
  vote_average,
  genre_ids,
}) => {
  return (
    <>
      <div className="card">
        <div className="card__image">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={`${name} Poster`}
            width={300}
            height={450}
          />
        </div>
        <Link href={`/tv/${id}`}>
          <a>
            <div className="card__content">
              <div className="card__label">
                <label>TV Show</label>
              </div>
              <div className="card__description">
                <label className="card__year">
                  {moment(first_air_date).year()}
                </label>
                <label className="card__title">{name}</label>
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

export default TvShowCard;
