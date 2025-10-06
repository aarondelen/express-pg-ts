import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
        <Navbar onSearch={setSearchTerm}/>
        <Table searchTerm={searchTerm} />
    </>
  );
};

export default App;
