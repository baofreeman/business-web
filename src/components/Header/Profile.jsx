import { useState } from "react";
import { Button, Loading } from "../ui/index";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../api/authApiSlice";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import useAuth from "../../hook/useAuth";

const Profile = () => {
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const { username, roles } = useAuth();

  const showModalUser = () => {
    setShowUser((prev) => !prev);
  };
  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      const res = await logoutUser();
      if (res.data) {
        setIsLoading(false);
        window.location.reload();
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  let renderUser;
  renderUser = (
    <div className="w-[100px] sm:w-max text-center">
      <div
        className="relative w-full sm:w-[60px] flex justify-center cursor-pointer"
        onClick={showModalUser}
      >
        <h1 className="text-md hover:text-orange dark:hover:text-white select-none whitespace-nowrap overflow-hidden text-ellipsis">
          {username}
        </h1>
        {showUser && (
          <div className="absolute z-50 bg-light dark:bg-gray top-14 right-0 w-[150px] flex flex-col items-center justify-center gap-y-4 border border-orange p-4">
            <div className="absolute top-3 right-3">
              <DeleteIcon onClick={showModalUser} />
            </div>
            {roles?.includes("admin") && (
              <Button size="s-link" design="link-basic" to={"/admin"}>
                admin
              </Button>
            )}

            <Button
              size="s-link"
              design="link-basic"
              to={"/account/change-password"}
            >
              đổi mật khẩu
            </Button>
            <Button size="s-link" design="link-primary" onClick={handleLogOut}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {isLoading && <Loading />}
      {username ? (
        renderUser
      ) : (
        <>
          <Button size="m" design="link-primary" to={"/account/login"}>
            đăng nhập
          </Button>
          <Button size="m" design="link-primary" to={"/account/register"}>
            đăng ký
          </Button>
        </>
      )}
    </>
  );
};

export default Profile;
