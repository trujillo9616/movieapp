import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import {
  formatNumber,
  getCountries,
  getTrailerKey,
  getWatchProviders,
} from "../../utils/helper";
import StarRatings from "react-star-ratings";
import YouTubeEmbed from "../../components/YouTubeEmbed";
import WatchProvider from "../../components/WatchProvider";

const MovieDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits,images,videos,recommendations,watch/providers`
        );
        setMovieData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieData();

    return () => {
      setMovieData(null);
      setLoading(true);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  const trailerKey = movieData ? getTrailerKey(movieData?.videos) : null;
  const watchProviders = movieData
    ? getWatchProviders(movieData["watch/providers"])
    : null;
  const streaming = watchProviders?.flatrate || [];
  const onDemand = watchProviders?.buy || [];

  return (
    <div className="detail">
      <div className="detail__top">
        <div className="detail__image">
          <Image
            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
            alt={movieData.title}
            layout="fill"
            objectFit="cover"
            loading="eager"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
            priority
          />
        </div>
        <div className="detail__filter" />
        <div className="detail__content">
          <div className="detail__header">
            <Header />
          </div>
          <div className="flex flex-row h-full">
            <div className="detail__info-left">
              <div className="detail__info-left__top">
                <label className="detail__title">{movieData.title}</label>
                <label className="detail__tagline">{`"${movieData.tagline}"`}</label>
                <p className="detail__overview">{movieData.overview}</p>
              </div>
              <div className="detail__info-left__bottom">
                <label className="detail__overview">{`Runtime: ${movieData.runtime} min`}</label>
                <label className="detail__overview">{`Release Date: ${moment(
                  movieData.release_date,
                  "YYYY-MM-DD"
                ).format("LL")}`}</label>
                <label className="detail__overview">{`Status: ${movieData.status}`}</label>
                <label className="detail__overview">{`Budget: $${formatNumber(
                  movieData.budget
                )}`}</label>
                <label className="detail__overview">{`Production Countries: ${getCountries(
                  movieData.production_countries
                )}`}</label>
                <div>
                  <label className="detail__overview">Average Rating: </label>
                  <StarRatings
                    rating={movieData.vote_average / 2}
                    starRatedColor="rgb(168 85 247)"
                    numberOfStars={5}
                    name="rating"
                    starDimension="10px"
                    starSpacing="2px"
                  />
                </div>
              </div>
            </div>
            <div className="detail__info-right">
              <div className="detail__info-right__top">
                <div className="flex flex-col">
                  {streaming.length > 0 && (
                    <label className="detail__overview">
                      Available on Streaming:{" "}
                    </label>
                  )}
                  <div className="flex flex-row">
                    {streaming.map((provider: any, index: number) => (
                      <WatchProvider key={index} {...provider} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  {onDemand.length > 0 && (
                    <label className="detail__overview">
                      Available on Demand:{" "}
                    </label>
                  )}
                  <div className="flex flex-row">
                    {onDemand.map((provider: any, index: number) => (
                      <WatchProvider key={index} {...provider} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="detail__info-right__bottom">
                {trailerKey && (
                  <YouTubeEmbed
                    embedId={trailerKey}
                    title={`${movieData.title} Trailer`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail__bottom">Movie Details of {id}</div>
    </div>
  );
};

export default MovieDetails;
