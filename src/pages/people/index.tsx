import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import SimpleSlider from "../../components/Slider";
import Footer from "../../components/Footer";
import MyHead from "../../components/MyHead";

const PeopleHome: NextPage = () => {
  const [data, setData] = useState<any>({
    trending: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const trending = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        setData({
          trending: trending.data.results,
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
      });
      setLoading(true);
    };
  }, []);

  console.log(data);
  return (
    <>
      <MyHead title="MovieApp - People" />
      <div className="flex flex-col main__background h-screen">
        <div>
          <Header />
        </div>
        <div className="flex flex-col justify-center self-center py-10 text-white px-4 items-center">
          <span className="text-lg md:text-7xl antialiased font-bold tracking-wide text-inherit">
            Talent and Crew
          </span>
          <span className="self-center py-5">
            Learn more about your favorite stars and the crew behind the movies!
          </span>
        </div>
        <div className="px-10">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neutral-800"></div>
            </div>
          ) : (
            <div className="px-10">
              <SimpleSlider title={"Trending"} data={data.trending} />
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

export default PeopleHome;
