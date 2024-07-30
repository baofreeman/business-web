import { useGetUserQuery } from "../api/authApiSlice";

const useAuth = () => {
  let user = {
    username: "",
    userId: undefined,
    roles: ["user"],
  };

  const { currentUser } = useGetUserQuery("currentUser", {
    selectFromResult: ({ data }) => ({
      currentUser: data?.user,
    }),
  });
  user = { ...currentUser, userId: currentUser?._id };

  return user;
};

export default useAuth;
