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
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="py-4">
      <h2 className="py-4">
        <span className="mx-6 text-sm md:text-xl leading-normal font-extrabold text-gray-200 text-ellipsis">
          {title}
        </span>
      </h2>
      <div>
        <Slider {...settings}>
          {data.map((item: any, index: number) => {
            return (
              <div key={index}>
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
    </div>
  );
};

export default SimpleSlider;
