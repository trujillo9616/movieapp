import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import axios from "axios";
import { movieList, seriesList } from "../utils/obj";
import SimpleSlider from "../components/Slider";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [moviesData, setMovieDate] = useState<any>([]);
  const [showsData, setShowsData] = useState<any>([]);

  useEffect(() => {
    // async function fetchTrending() {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_BASE_URL}trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    //     );
    //     setTrendingData(response.data.results);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // async function fetchMovies() {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_BASE_URL}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    //     );
    //     setMovieDate(response.data.results);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // async function fetchShows() {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_BASE_URL}tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    //     );
    //     setShowsData(response.data.results);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchTrending();
    // fetchMovies();
    // fetchShows();

    return () => {
      setTrendingData([]);
      setMovieDate(movieList);
      setShowsData(seriesList);
    };
  }, []);

  console.log("Movie List: ", moviesData);
  console.log("Show List: ", showsData);

  return (
    <>
      <Head>
        <title>MovieApp</title>
        <meta
          name="description"
          content="Web app with useful information about movies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-neutral-900">
        <div>
          <Header />
        </div>
        <div>
          <SimpleSlider title={"Trending Movies!"} data={moviesData} />
          <SimpleSlider title={"Trending TV Shows!"} data={showsData} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
