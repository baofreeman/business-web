import { useGetUsersQuery } from "../../../api/usersApiSlice";
import Loading from "../../ui/Loading/Loading";
import UserExtent from "./UserExtent";

const Users = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useGetUsersQuery("allUsers", {
    pollingInterval: 60000000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;
  let user;
  if (isLoading) return (content = <Loading />);
  user = users ? (
    users.ids.map((user) => <UserExtent key={user} userId={user} />)
  ) : (
    <p>No users</p>
  );
  if (isSuccess)
    return (content = (
      <div className="p-10 w-full">
        <section className="w-full">
          {users ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left px-8 py-4">UID</th>
                  <th className="text-left px-8 py-4">Tên người dùng</th>
                  <th className="text-left px-8 py-4">Vai trò</th>
                  <th className="text-left px-8 py-4">Trạng thái</th>
                  <th className="text-left px-8 py-4"></th>
                </tr>
              </thead>
              <tbody>{user}</tbody>
            </table>
          ) : (
            <div className="text-center m-auto">
              <h1>Không có đơn hàng</h1>
            </div>
          )}
        </section>
      </div>
    ));
};

export default Users;
