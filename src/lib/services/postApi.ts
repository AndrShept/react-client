import { Post } from '../types';
import { api } from './api';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
    getFavoritePosts: builder.query<Post[], void>({
      query: () => ({
        url: '/favorite-posts',
        method: 'GET',
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (postData) => ({
        url: '/posts',
        method: 'POST',
        body: postData,
      }),
    }),
    deletePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    editPost: builder.mutation<Post, { id: string; postData: Partial<Post> }>({
      query: ({ id, postData }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: postData,
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useLazyGetAllPostsQuery,
  useGetFavoritePostsQuery,
  useLazyGetFavoritePostsQuery,
} = postApi;

export const { addPost, deletePost, editPost, getPostById, getAllPosts } =
  postApi.endpoints;
