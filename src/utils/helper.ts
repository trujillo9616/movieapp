import moment from 'moment';
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

export function getZodiacSign(date: string | null): string | undefined {
  if (!date) return undefined;
  const [year, _month, _day] = date.split("-");
  const zodiacSigns = [
    "Aries ♈️",
    "Taurus ♉️",
    "Gemini ♊️",
    "Cancer ♋️",
    "Leo ♌️",
    "Virgo ♍️",
    "Libra ♎️",
    "Scorpio ♏️",
    "Sagittarius ♐️",
    "Capricorn ♑️",
    "Aquarius ♒️",
    "Pisces ♓️",
  ];
  const zodiacSignsDays = [
    ["03-21", "04-19"],
    ["04-20", "05-20"],
    ["05-21", "06-20"],
    ["06-21", "07-22"],
    ["07-23", "08-22"],
    ["08-23", "09-22"],
    ["09-23", "10-22"],
    ["10-23", "11-21"],
    ["11-22", "12-21"],
    ["12-22", "01-19"],
    ["01-20", "02-18"],
    ["02-19", "03-20"],
  ];

  for (let i = 0; i < zodiacSignsDays.length; i++) {
    const [start, end]: any = zodiacSignsDays[i];
    const zodiac = moment(`${year}-${start}`).isSameOrBefore(date) && moment(`${year}-${end}`).isSameOrAfter(date);
    if (zodiac) return zodiacSigns[i];
  }
}
