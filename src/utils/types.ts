export type MovieType = {
  id: number,
  title: string,
}

export type TvShowType = {
  id: number,
  name: string,
}

export type PersonType = {
  id: number,
  name: string,
}

export type CountryType = {
  iso_3166_1: string,
  name: string,
}

export type GenreType = Map<number, string>;

export type VideoType = {
  results: Array<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string;
    id: string;
  }>,
}
