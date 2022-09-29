import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import SimpleSlider from "../components/Slider";
import Footer from "../components/Footer";
import MyHead from "../components/MyHead";

const Home: NextPage = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [moviesData, setMovieData] = useState<any>([]);
  const [showsData, setShowsData] = useState<any>([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setTrendingData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setMovieData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchShows() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setShowsData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrending();
    fetchMovies();
    fetchShows();

    return () => {
      setTrendingData([]);
      setMovieData([]);
      setShowsData([]);
    };
  }, []);

  return (
    <>
      <MyHead title="Home" />
      <div className="flex flex-col main__background">
        <div>
          <Header />
        </div>
        <div className="px-10">
          <SimpleSlider title={"Trending Items!"} data={trendingData} />
          <SimpleSlider title={"Trending Movies"} data={moviesData} />
          <SimpleSlider title={"Trending TV Shows"} data={showsData} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
