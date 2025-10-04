import AddEmployeeModal from "../modal/AddEmployeeModal";

const Navbar = () => {
  const handleOpenAddModal = () => {
    const modal = document.getElementById("add-employee-modal") as HTMLDialogElement;
    modal?.showModal();
  };

  return (

    <>
      <div className="navbar bg-base-100 shadow-sm justify-between mb-12">
        <div className="logo">
          <a className="btn btn-ghost text-xl">Employee DB</a>
        </div>

        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered max-w-3xl m-auto"
          />
        </div>

        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={handleOpenAddModal}
        >
          Add 
        </button>

        <AddEmployeeModal />

      </div>
    </>
  );
};

export default Navbar;
