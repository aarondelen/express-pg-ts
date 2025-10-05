import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

type EditEmployeeModalProps = {
  employee: {
    id: number;
    name: string;
    email: string;
    job: string | null;
    age: number | null;
    salary: number | null;
    status: "EMPLOYED" | "TERMINATED" | "PROBATION";
  } | null;
  onClose: () => void;
};

const EditEmployeeModal = ({ employee, onClose }: EditEmployeeModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    salary: "",
    job: "",
    status: "EMPLOYED" as "EMPLOYED" | "TERMINATED" | "PROBATION",
  });

  // open + populate
  useEffect(() => {
    const modal = document.getElementById("edit-employee-modal") as HTMLDialogElement;

    if (employee && modal) {
      setFormData({
        name: employee.name,
        email: employee.email,
        age: employee.age?.toString() || "",
        salary: employee.salary?.toString() || "",
        job: employee.job || "",
        status: employee.status,
      });
      modal.showModal();
    }
  }, [employee]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!employee) return;
      const res = await api.put(`/users/${employee.id}`, {
        ...formData,
        age: formData.age ? Number(formData.age) : null,
        salary: formData.salary ? Number(formData.salary) : null,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleClose();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleClose = () => {
    const modal = document.getElementById("edit-employee-modal") as HTMLDialogElement;
    if (modal) modal.close();
    setFormData({ name: "", email: "", age: "", salary: "", job: "", status: "EMPLOYED" });
    onClose();
  };

  return (
    <dialog id="edit-employee-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Edit Employee</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="input input-bordered w-full"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            className="input input-bordered w-full"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="job"
            placeholder="Job Title"
            className="input input-bordered w-full"
            value={formData.job}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            className="select select-bordered w-full"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="EMPLOYED">Employed</option>
            <option value="TERMINATED">Terminated</option>
            <option value="PROBATION">Probation</option>
          </select>

          <button type="submit" className="btn btn-primary mt-4">
            {mutation.isPending ? "Updating…" : "Update Employee"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default EditEmployeeModal;
