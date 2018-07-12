// tslint:disable-next-line:max-line-length
// cast and crew are type any because of the complexity of each object. if someone wants to trim that data down and adjust the interface to conform, have at it
export interface IMovie {
    adult: boolean;
    budget: number;
    movie_id: number;
    original_title: string;
    overview: string;
    popularity: number;
    release_date: Date;
    revenue: number;
    runtime: number;
    tagline: string;
    title: string;
    vote_average?: number;
    vote_count?: number;
    movie_cast?: any;
    crew?: any;
}
