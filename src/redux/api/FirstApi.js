import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBase';

export const firstApi = createApi({
    reducerPath: 'firstApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:5000/',
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getForm: builder.query({
            query: () => ({
                url: 'posts',
                transformResponse: (res) => res.sort((a, b) => b.id - a.id),
                method: 'GET',
            }),
            providesTags: ['Posts']
        }),
        addForm: builder.mutation({
            query: (data) => ({
                url: 'posts',
                method: 'POST',
                data
            }),
            invalidatesTags: ['Posts']
        }),
        updateForm: builder.mutation({
            query: (data) => ({
                url: `posts/${data.id}`,
                method: 'PUT',
                data
            }),
            invalidatesTags: ['Posts']
        }),
        deleteForm: builder.mutation({
            query: ({ id }) => ({
                url: `posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Posts']
        }),
    }),
})

export const { useGetFormQuery, useAddFormMutation, useUpdateFormMutation, useDeleteFormMutation } = firstApi;
