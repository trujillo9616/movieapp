import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import SimpleSlider from "../../components/Slider";
import Footer from "../../components/Footer";
import MyHead from "../../components/MyHead";

const MoviesHome: NextPage = () => {
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [popularData, setPopularData] = useState<any>([]);
  const [topRatedData, setTopRatedData] = useState<any>([]);
  const [upcomingData, setUpcomingData] = useState<any>([]);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setNowPlayingData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchPopular() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setPopularData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchTopRated() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setTopRatedData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchUpcoming() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setUpcomingData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();

    return () => {
      setNowPlayingData([]);
      setPopularData([]);
      setTopRatedData([]);
      setUpcomingData([]);
    };
  }, []);

  return (
    <>
      <MyHead title="Movies" />
      <div className="flex flex-col main__background">
        <div>
          <Header />
        </div>
        <div className="px-10">
          <SimpleSlider title={"Now Playing"} data={nowPlayingData} />
          <SimpleSlider title={"Popular"} data={popularData} />
          <SimpleSlider title={"Top Rated"} data={topRatedData} />
          <SimpleSlider title={"Upcoming"} data={upcomingData} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MoviesHome;
