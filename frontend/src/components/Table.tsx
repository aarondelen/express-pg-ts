import { useEffect, useState } from "react";
import api from "../lib/api";

type TableProps = {
  id: number;
  name: string;
  email: string;
  job: string | null;
  age: number | null;
  salary: number | null;
  status: "EMPLOYED" | "TERMINATED" | "PROBATION";
};

const Table = () => {
  const [users, setUsers] = useState<TableProps[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [])

  return (
    <>
      <div className="overflow-x-auto mx-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.job || "N/A"}</td>
                <td>{user.age ?? "N/A"}</td>
                <td>{user.salary ? `$ ${user.salary}` : "N/A"}</td>
                <td>
                  <span className={`badge font-semibold text-black/80 ${user.status === "EMPLOYED" ? "badge-success" : user.status === "TERMINATED" ? "badge-error" : "badge-warning"}`}>{user.status}</span>
                </td>
                <td className="flex gap-5">
                  <button className="btn btn-sm btn-info font-bold text-black/80">Update</button>
                  <button className="btn btn-sm btn-error font-bold text-black/80">Delete</button>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={7} className="text-center">No employees found 😥</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
