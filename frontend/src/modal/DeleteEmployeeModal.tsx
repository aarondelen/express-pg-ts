import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import { useState } from "react";

type DeleteEmployeeModalProp = {
  employeeId: number | null;
  employeeName: string | undefined;
  isOpen: boolean;
  onClose: () => void;
};

const DeleteEmployeeModal = ({
  employeeId,
  employeeName,
  isOpen,
  onClose,
}: DeleteEmployeeModalProp) => {
  const queryClient = useQueryClient();

  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      setIsDeleting(true);
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      setIsDeleting(false);
    },
    onError: () => {
      alert("Failed to delete employee. Please try again.");
      setIsDeleting(false);
    },
  });

  const handleConfirmDelete = () => {
    if(typeof employeeId === "number") mutate(employeeId);
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Delete Employee</h3>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-500">{employeeName}</span>
              ? <br /> This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button className="btn" onClick={onClose} disabled={isDeleting}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={onClose}></div>
        </div>
      )}
    </>
  );
};

export default DeleteEmployeeModal;
