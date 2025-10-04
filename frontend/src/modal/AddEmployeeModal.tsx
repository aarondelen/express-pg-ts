import { useState } from "react";
import api from "../lib/api";

const AddEmployeeModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    job: "",
    age: "",
    salary: "",
    status: "EMPLOYED",
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        ...formData,
        age: formData.age ? Number(formData.age) : null,
        salary: formData.salary ? Number(formData.salary) : null,

      });
      const modal = document.getElementById("add-employee-modal") as HTMLDialogElement;
      modal?.close();

    } catch (err) {
      console.error("Error creating employees", err);
    }
  };

  return (
    <>
      <dialog id="add-employee-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">Add New Employee</h3>

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
              Save Employee
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddEmployeeModal;
