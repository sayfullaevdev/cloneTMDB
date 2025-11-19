import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = import.meta.env.VITE_TMDB_TOKEN;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getMovies: builder.query({ query: (page: number = 1) => `/discover/movie?page=${page}&language=ru&adult=true`, }),
        getMovieDetails: builder.query({ query: (id: string) => `/movie/${id}?language=ru` }),
        getSimilarMovies: builder.query({ query: (id: string) => `/movie/${id}/similar?language=ru` }),
        getMovieImages: builder.query({ query: (id: string) => `/movie/${id}/images` }),
        getMovieVideos: builder.query({ query: (id: string) => `/movie/${id}/videos` }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery,
    useGetMovieImagesQuery,
    useGetMovieVideosQuery
} = apiSlice;
