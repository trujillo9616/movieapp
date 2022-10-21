import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import SimpleSlider from "../../components/Slider";
import Footer from "../../components/Footer";
import MyHead from "../../components/MyHead";

const TvHome: NextPage = () => {
  const [data, setData] = useState<any>({
    airingToday: null,
    ongoing: null,
    popular: null,
    topRated: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const airingToday = await axios.get(
          `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const ongoing = await axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const popular = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const topRated = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        setData({
          airingToday: airingToday.data.results,
          ongoing: ongoing.data.results,
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
        airingToday: null,
        ongoing: null,
        popular: null,
        topRated: null,
      });
      setLoading(true);
    };
  }, []);

  return (
    <>
      <MyHead title="MovieApp - TV Shows" />
      <div className="flex flex-col main__background">
        <div>
          <Header />
        </div>
        <div className="flex flex-col justify-center self-center py-10 text-white px-4 items-center">
          <span className="text-lg md:text-7xl antialiased font-bold tracking-wide text-inherit">
            TV Shows
          </span>
          <span className="self-center py-5">
            Learn more about your favorite shows!
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neutral-800"></div>
          </div>
        ) : (
          <div className="px-10">
            <SimpleSlider title={"Airing Today"} data={data.airingToday} />
            <SimpleSlider title={"Ongoing Shows"} data={data.ongoing} />
            <SimpleSlider title={"Popular"} data={data.popular} />
            <SimpleSlider title={"Top Rated"} data={data.topRated} />
          </div>
        )}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TvHome;
