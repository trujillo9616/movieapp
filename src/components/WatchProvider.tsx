import React from "react";
import Image from "next/image";

interface WatchProviderProps {
  logo_path: string;
  provider_name: string;
}

const WatchProvider: React.FC<WatchProviderProps> = ({
  logo_path,
  provider_name,
}) => {
  return (
    <div className="w-auto m-2">
      <Image
        src={`https://image.tmdb.org/t/p/original${logo_path}`}
        alt={provider_name}
        width={40}
        height={40}
      />
    </div>
  );
};

export default WatchProvider;
