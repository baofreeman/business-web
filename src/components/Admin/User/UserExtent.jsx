import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../api/usersApiSlice";
import Button from "../../ui/Button/Button";
import Modal from "../../ui/Modal/Modal";
import DeleteIcon from "../../../assets/icons/DeleteIcon";

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

  const handleDelete = async () => {
    try {
      await deleteUser({ userId: user?._id });
    } catch (error) {
      return error;
    }
  };
  return (
    <tr>
      <td className="border px-8 py-4">{user?._id}</td>
      <td className="border px-8 py-4">
        <h1>{user?.username}</h1>
      </td>
      <td className="border px-8 py-4">
        {user?.roles.map((role) => (
          <h1 key={user?._id}>{role}</h1>
        ))}
      </td>
      <td className="border px-8 py-4">
        <h1>{user?.active}</h1>
      </td>
      <td className="border px-8 py-4">
        <DeleteIcon handleToggleModal={handleToggleModal} />
      </td>
      {modal && (
        <Modal
          handleToggleModal={handleToggleModal}
          callback={handleDelete}
          title={"Bạn muốn xóa người dùng vĩnh viễn"}
          data={user?._id}
        />
      )}
    </tr>
  );
};

export default UserExtent;
