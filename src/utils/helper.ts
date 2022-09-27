import { genresById } from "./obj";
import { CountryType, VideoType } from "./types";

export function getGenres(genres: Array<number>): string {
  if (!genres) return "N/A";
  return genres.map((genre) => genresById.get(genre)).join(", ");
}

export function getCountries(countries: Array<CountryType>): string {
  if (!countries) return "N/A";
  return countries.map((country) => country.iso_3166_1).join(", ").toUpperCase();
}

export function getLastYear(status: string, lastYear: string): string {
  return status === "Ended" ? lastYear : "...";
}

export function formatNumber(budget: number): string {
  return budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTrailerKey(videos: VideoType): string {
  const trailer = videos.results.find((video) => video.type === "Trailer");
  return trailer ? trailer.key : "";
}

export function getWatchProviders(watchProviders: any): any {
  return watchProviders.results.US;
}
