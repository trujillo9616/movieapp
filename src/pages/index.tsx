import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import SimpleSlider from "../components/Slider";
import Footer from "../components/Footer";
import MyHead from "../components/MyHead";

const Home: NextPage = () => {
  const [data, setData] = useState<any>({
    trending: null,
    movies: null,
    tv: null,
    people: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const trending = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const movies = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const tv = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const people = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        setData({
          trending: trending.data.results,
          movies: movies.data.results,
          tv: tv.data.results,
          people: people.data.results,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    return () => {
      setData({
        trending: null,
        movies: null,
        tv: null,
        people: null,
      });
      setLoading(true);
    };
  }, []);

  return (
    <>
      <MyHead title="MovieApp - Home" />
      <div className="flex flex-col main__background">
        <div>
          <Header />
        </div>
        <div className="flex flex-col justify-center self-center py-10 text-white px-4 items-center">
          <span className="text-lg md:text-7xl antialiased font-bold tracking-wide text-inherit">
            Welcome to the MovieApp!
          </span>
          <span className="self-center py-5">
            Browse and click the poster for more information.
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neutral-800"></div>
          </div>
        ) : (
          <div className="px-10">
            <SimpleSlider title={"Trending Items!"} data={data.trending} />
            <SimpleSlider title={"Trending Movies"} data={data.movies} />
            <SimpleSlider title={"Trending TV Shows"} data={data.tv} />
            <SimpleSlider title={"Trending Talent"} data={data.people} />
          </div>
        )}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
