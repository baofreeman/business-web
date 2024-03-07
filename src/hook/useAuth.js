import { useSelector } from "react-redux";
import { selectCurrentUser } from "../api/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentUser);
  let isAdmin = false;
  let isCustommer = false;
  let status = "Custommer";
  console.log(token);
  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;
    isAdmin = roles.includes("Admin");
    isCustommer = roles.includes("Custommer");
    if (isAdmin) status = "Admin";
    if (isCustommer) status = "Custommer";

    return { username, roles, status, isAdmin, isCustommer };
  }
  return { username: "", roles: [], isAdmin, isCustommer, status };
};

export default useAuth;
