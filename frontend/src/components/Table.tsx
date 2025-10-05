import api from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import DeleteEmployeeModal from "../modal/DeleteEmployeeModal";
import EditEmployeeModal from "../modal/EditEmployeeModal";
import { useState } from "react";

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
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<TableProps[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  const [selectedEmployee, setSelectedEmployee] = useState<TableProps | null>(
    null
  ); // Delete Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Delete Modal

  const [selectedForEdit, setSelectedForEdit] = useState<TableProps | null>(
    null
  ); // Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false); // Edit Modal

  const openDeleteModal = (employee: TableProps) => {
    setSelectedEmployee(employee);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedEmployee(null);
    setIsDeleteOpen(false);
  };

  const openEditModal = (employee: TableProps) => {
    setSelectedForEdit(employee);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setSelectedForEdit(null);
    setIsEditOpen(false);
  };

  if (isLoading)
    return <div className="text-center py-4">Loading Employees…</div>;
  if (isError)
    return (
      <div className="text-center py-4 text-red-500">
        Failed to fetch employees 😢
      </div>
    );

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
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.job || "N/A"}</td>
                  <td>{user.age ?? "N/A"}</td>
                  <td>{user.salary ? `$ ${user.salary}` : "N/A"}</td>
                  <td>
                    <span
                      className={`badge font-semibold text-black/80 ${
                        user.status === "EMPLOYED"
                          ? "badge-success"
                          : user.status === "TERMINATED"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="flex gap-5">
                    <button
                      className="btn btn-sm btn-info font-bold text-black/80"
                      onClick={() => openEditModal(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error font-bold text-black/80"
                      onClick={() => openDeleteModal(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No employees found 😥
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteEmployeeModal
        employeeId={selectedEmployee?.id || null}
        employeeName={selectedEmployee?.name}
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
      />

      <EditEmployeeModal
        employee={selectedForEdit}
        onClose={closeEditModal}
      />
    </>
  );
};

export default Table;
