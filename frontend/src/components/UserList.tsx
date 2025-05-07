import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import axios from "axios";
import { Link } from "react-router-dom";

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [Loading, setLoading] = useState(false);
  const [searchByMail, setSearchByMail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_BASE_URL);
        console.log(response);
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id?: string) => {
    if (id) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}/delete`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Filter users based on email
  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(searchByMail.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="flex justify-between mb-4 relative">
        <div className="w-64 relative">
          <input
            type="text"
            placeholder="Search by email"
            className="p-2 border rounded w-full"
            value={searchByMail}
            onChange={(e) => setSearchByMail(e.target.value)}
          />

          {/* show suggestion while search mail  */}
          {searchByMail && (
            <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
              {users
                .filter(
                  (user) =>
                    user.email &&
                    user.email
                      .toLowerCase()
                      .includes(searchByMail.toLowerCase())
                )
                .slice(0, 5)
                .map((user) => (
                  <li
                    key={user.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSearchByMail(user.email || "")}
                  >
                    {user.email}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <Link
          to="/create"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add New User
        </Link>
      </div>

      <table className="w-full border mt-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Full Name</th>
            <th className="p-2 text-center">Phone No.</th>
            <th className="p-2 text-center">Role</th>
            <th className="p-2 text-center">Location</th>
            <th className="p-2 text-center">Department</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>
        {Loading ? (
          <tbody>
            <tr>
              <td colSpan={6} className="text-center">
                Loading...
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2 text-left">{`${user.firstName} ${user.lastName}`}</td>
                <td className="p-2 text-center">{user.phone}</td>
                <td className="p-2 text-center">{user.role}</td>
                <td className="p-2 text-center">{user.location}</td>
                <td className="p-2 text-center">{user.department}</td>
                <td className="p-2 space-x-3 text-right">
                  <Link
                    to={`/edit/${user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500 hover:underline ml-2 cursor-pointer"
                    onClick={() => {
                      handleDelete(user.id!);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
