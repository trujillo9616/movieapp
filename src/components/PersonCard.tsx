import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PersonCardProps {
  id: number;
  name: string;
  character: string | null;
  job: string | null;
  profile_path: string;
  known_for_department: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  character,
  job,
  profile_path,
  known_for_department,
}) => {
  return (
    <>
      <div className="card">
        <div className="card__image">
          <Image
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w500${profile_path}`
                : "/missingPhoto.png"
            }
            alt={`${name} Photo`}
            layout="intrinsic"
            width={200}
            height={300}
            placeholder="blur"
            blurDataURL={
              profile_path
                ? `https://image.tmdb.org/t/p/original${profile_path}`
                : "/missingPhoto.png"
            }
            priority
          />
        </div>
        <Link href={`/people/${id}`}>
          <a>
            <div className="card__content">
              <div className="card__label">
                <label>{known_for_department}</label>
              </div>
              <div className="card__description py-2">
                {character && <p className="card__year">{character}</p>}
                {job && <p className="card__year">{job}</p>}
                <label className="card__title">{name}</label>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default PersonCard;
