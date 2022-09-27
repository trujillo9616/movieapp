import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import TvShowCard from "./TvShowCard";

interface SliderProps {
  title: string;
  data: any;
}

const SimpleSlider: React.FC<SliderProps> = ({ title, data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    swipeToSlide: true,
  };
  return (
    <div className="">
      <h2>{title}</h2>
      <Slider {...settings}>
        {data.map((item: any, index: number) => {
          return (
            <div key={index} className="mx-2">
              {item.title ? (
                <MovieCard
                  id={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                  release_date={item.release_date}
                  genre_ids={item.genre_ids}
                  vote_average={item.vote_average}
                />
              ) : (
                <TvShowCard
                  id={item.id}
                  name={item.name}
                  poster_path={item.poster_path}
                  first_air_date={item.first_air_date}
                  genre_ids={item.genre_ids}
                  vote_average={item.vote_average}
                />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
