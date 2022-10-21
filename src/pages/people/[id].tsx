import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../../components/Header";
import axios from "axios";
import moment from "moment";
import MyHead from "../../components/MyHead";
import Footer from "../../components/Footer";
import SimpleSlider from "../../components/Slider";

const PersonDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [personData, setPersonData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=combined_credits,images`
        );
        setPersonData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPersonData();

    return () => {
      setPersonData(null);
      setLoading(true);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  return (
    <>
      <MyHead title={personData?.name} />
      <div className="flex flex-col main__background">
        <div>
          <Header />
        </div>
        <div className="flex flex-row justify-items-center px-20">
          <div className="justify-center self">
            <Image
              src={`https://image.tmdb.org/t/p/w500${personData.profile_path}`}
              alt={`${personData.name} profile image`}
              layout="intrinsic"
              width={200}
              height={300}
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/original${personData.profile_path}`}
              priority
            />
          </div>

          <div className="flex flex-col ml-10 w-2/3 text-slate-50">
            <h1 className="text-4xl font-bold">{personData.name}</h1>
            <div className="flex flex-col">
              <p className="text-lg font-normal">
                🎂{" "}
                {moment(personData.birthday).format("MMMM Do, YYYY") || "N/A"}
              </p>
              <p className="text-lg font-normal">
                📍 {personData.place_of_birth || "Unknown"}
              </p>

              <p className="text-lg font-normal">
                🎬 {personData.known_for_department || "Unknown"}
              </p>

              <p className="text-lg font-normal">
                🎞 {personData.biography || "No given biography"}
              </p>
            </div>
          </div>
        </div>
        <div className="px-10">
          {personData.combined_credits.cast.length > 0 && (
            <SimpleSlider
              title="Appeared As Cast"
              data={personData?.combined_credits?.cast}
            />
          )}
          {personData.combined_credits.crew.length > 0 && (
            <SimpleSlider
              title="Worked As Crew"
              data={personData?.combined_credits?.crew}
            />
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PersonDetails;
