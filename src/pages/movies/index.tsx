import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import SimpleSlider from "../../components/Slider";
import Footer from "../../components/Footer";
import MyHead from "../../components/MyHead";

const MoviesHome: NextPage = () => {
  const [data, setData] = useState<any>({
    nowPlaying: null,
    upcoming: null,
    popular: null,
    topRated: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const nowPlaying = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const upcoming = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const popular = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const topRated = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        setData({
          nowPlaying: nowPlaying.data.results,
          upcoming: upcoming.data.results,
          popular: popular.data.results,
          topRated: topRated.data.results,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    return () => {
      setData({
        nowPlaying: null,
        upcoming: null,
        popular: null,
        topRated: null,
      });
      setLoading(true);
    };
  }, []);

  console.log(data);

  return (
    <>
      <MyHead title="MovieApp - Movies" />
      <div className="flex flex-col main__background">
        <div>
          <Header />
        </div>
        <div className="flex flex-col justify-center self-center py-10 text-white px-4 items-center">
          <span className="text-lg md:text-7xl antialiased font-bold tracking-wide text-inherit">
            Movies
          </span>
          <span className="self-center py-5">
            Learn more about your favorite movies!
          </span>
        </div>
        <div className="px-10">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neutral-800"></div>
            </div>
          ) : (
            <div className="px-10">
              <SimpleSlider title={"Now Playing"} data={data.nowPlaying} />
              <SimpleSlider title={"Popular"} data={data.popular} />
              <SimpleSlider title={"Top Rated"} data={data.topRated} />
              <SimpleSlider title={"Upcoming"} data={data.upcoming} />
            </div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MoviesHome;
