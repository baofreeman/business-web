import { apiSlice } from "./apiSlice";

// Invalidate tag mutation
const invalidatesTags = (result) => (result ? ["UNAUTHORIZED"] : []);

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: { ...credentials },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result) => {
        console.log(result);
        return result ? ["UNAUTHORIZED"] : [];
      },
    }),

    resetPasswordLink: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password-link",
        method: "POST",
        body: { ...credentials },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        const { id, token, ...values } = data;
        const actualData = { ...values };
        return {
          url: `/auth/reset-password/${id}/${token}`,
          method: "POST",
          body: { ...actualData },
          headers: { "Content-Type": "application/json" },
        };
      },
      invalidatesTags,
    }),

    // Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),

    getUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error) => {
        return result
          ? [{ type: "Auth", id: result?.user?._id }]
          : error?.status === 401
          ? ["UNAUTHORIZED"]
          : ["UNKNOWN_ERROR"];
      },
    }),

    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: { ...credentials },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),

    // Logout
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
          body: {},
          credentials: "include",
        };
      },
      invalidatesTags,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useGetUserQuery,
  useLogoutUserMutation,
  useChangePasswordMutation,
  useResetPasswordLinkMutation,
  useResetPasswordMutation,
} = authApiSlice;
