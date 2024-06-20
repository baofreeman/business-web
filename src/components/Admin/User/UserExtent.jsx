import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../api/usersApiSlice";
import Modal from "../../ui/Modal/Modal";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { toast } from "react-toastify";

const UserExtent = ({ userId }) => {
  const [modal, setModal] = useState(false);

  const { user } = useGetUsersQuery("allUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  }); // GET user based on userId

  const [deleteUser] = useDeleteUserMutation();

  // Toggle modal.
  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  // Delete user.
  const handleDelete = async () => {
    try {
      const res = await deleteUser({ userId: user?._id });
      toast.success(res?.data?.message);
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
