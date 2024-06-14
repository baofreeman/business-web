import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../api/usersApiSlice";
import Button from "../../ui/Button/Button";

const UserExtent = ({ userId }) => {
  const { user } = useGetUsersQuery("allUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const [modal, setModal] = useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  const handleDelete = async (e) => {
    try {
      const userId = e.target.value;
      await deleteUser({ userId });
    } catch (error) {
      return error;
    }
  };
  return (
    <>
      <tr>
        <td className="border px-8 py-4">{user?._id}</td>
        <td className="border px-8 py-4">
          <h1>{user?.username}</h1>
        </td>
        <td className="border px-8 py-4">
          {user?.roles.map((role) => (
            <h1>{role}</h1>
          ))}
        </td>
        <td className="border px-8 py-4">
          <h1>{user?.active}</h1>
        </td>
        <td className="border px-8 py-4">
          <Button
            size="m"
            design="basic"
            value={user?._id}
            onClick={handleToggleModal}
          >
            <svg
              className="fill-silver hover:fill-white cursor-pointer"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H1.71429V1.71429H0V0ZM3.42857 3.42857H1.71429V1.71429H3.42857V3.42857ZM5.14286 5.14286H3.42857V3.42857H5.14286V5.14286ZM6.85714 5.14286H5.14286V6.85714H3.42857V8.57143H1.71429V10.2857H0V12H1.71429V10.2857H3.42857V8.57143H5.14286V6.85714H6.85714V8.57143H8.57143V10.2857H10.2857V12H12V10.2857H10.2857V8.57143H8.57143V6.85714H6.85714V5.14286ZM8.57143 3.42857V5.14286H6.85714V3.42857H8.57143ZM10.2857 1.71429V3.42857H8.57143V1.71429H10.2857ZM10.2857 1.71429V0H12V1.71429H10.2857Z"></path>
            </svg>
          </Button>
        </td>
      </tr>
      {modal && (
        <div className="w-full h-[100%] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
          <div
            className="w-full h-[100%] bg-black opacity-80"
            onClick={handleToggleModal}
          ></div>
          <div className="bg-white flex items-center justify-center w-[300px] h-[150px] dark:bg-black border rounded-md absolute">
            <div className="absolute top-3 right-3">
              <Button size="m" design="basic" onClick={handleToggleModal}>
                <svg
                  className="fill-silver hover:fill-white cursor-pointer"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H1.71429V1.71429H0V0ZM3.42857 3.42857H1.71429V1.71429H3.42857V3.42857ZM5.14286 5.14286H3.42857V3.42857H5.14286V5.14286ZM6.85714 5.14286H5.14286V6.85714H3.42857V8.57143H1.71429V10.2857H0V12H1.71429V10.2857H3.42857V8.57143H5.14286V6.85714H6.85714V8.57143H8.57143V10.2857H10.2857V12H12V10.2857H10.2857V8.57143H8.57143V6.85714H6.85714V5.14286ZM8.57143 3.42857V5.14286H6.85714V3.42857H8.57143ZM10.2857 1.71429V3.42857H8.57143V1.71429H10.2857ZM10.2857 1.71429V0H12V1.71429H10.2857Z"></path>
                </svg>
              </Button>
            </div>
            <div className="flex justify-center gap-4 flex-col">
              <h1>Lựa chọn sẽ được xóa vĩnh viễn</h1>
              <div className="flex justify-center gap-2">
                <Button
                  size="s"
                  design="primary"
                  value={user?._id}
                  onClick={(e) => handleDelete(e)}
                >
                  Xoá
                </Button>
                <Button size="s" design="basic" onClick={handleToggleModal}>
                  Hủy bỏ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserExtent;
