import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import axios from "axios";
import SimpleSlider from "../../components/Slider";
import Footer from "../../components/Footer";

const MoviesHome: NextPage = () => {
  const [airingTodayData, setAiringTodayData] = useState([]);
  const [ongoingData, setOngoingData] = useState<any>([]);
  const [popularData, setPopularData] = useState<any>([]);
  const [topRatedData, setTopRatedData] = useState<any>([]);
  const [loadingAiringToday, setLoadingAiringToday] = useState(true);
  const [loadingOngoing, setLoadingOngoing] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    async function fetchAiringToday() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setAiringTodayData(response.data.results);
        setLoadingAiringToday(false);
        countLoader();
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchOngoing() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setOngoingData(response.data.results);
        setLoadingOngoing(false);
        countLoader();
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchPopular() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setPopularData(response.data.results);
        setLoadingPopular(false);
        countLoader();
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchTopRated() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setTopRatedData(response.data.results);
        setLoadingTopRated(false);
        countLoader();
      } catch (error) {
        console.log(error);
      }
    }
    fetchAiringToday();
    fetchOngoing();
    fetchPopular();
    fetchTopRated();

    return () => {
      setAiringTodayData([]);
      setOngoingData([]);
      setPopularData([]);
      setTopRatedData([]);
    };
  }, []);

  const countLoader = () => {
    if (
      !loadingAiringToday &&
      !loadingOngoing &&
      !loadingPopular &&
      !loadingTopRated
    ) {
      setFinishedLoading(true);
    }
  };

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
        {finishedLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neutral-800"></div>
          </div>
        ) : (
          <div className="px-10">
            <SimpleSlider title={"Airing Today"} data={airingTodayData} />
            <SimpleSlider title={"Ongoing Shows"} data={ongoingData} />
            <SimpleSlider title={"Popular"} data={popularData} />
            <SimpleSlider title={"Top Rated"} data={topRatedData} />
          </div>
        )}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MoviesHome;
