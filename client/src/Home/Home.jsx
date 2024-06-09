import { useRef, useState } from "react";
import { useGetAllJobsQuery } from "../state/api/jobApiSlice";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import JobListings from "./JobListings";
import Filter from "./Filter";

function Home() {
  const { data: jobs, isLoading } = useGetAllJobsQuery();
  const searchRef = useRef("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const cityRef = useRef("");
  const [type, setType] = useState("");
  const [homeOffice, setHomeOffice] = useState(false);

  const handleClick = () => {
    const search = searchRef.current.value;
    setFilteredJobs(
      jobs.filter((job) =>
        job.position.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const from =
      fromRef.current.value !== "" ? Number(fromRef.current.value) : 0;
    const to =
      toRef.current.value !== ""
        ? Number(toRef.current.value)
        : Number.MAX_SAFE_INTEGER;
    const city = cityRef.current.value;
    setFilteredJobs(
      jobs.filter((job) => job.salaryFrom >= from && job.salaryTo <= to)
    );
    setIsOpen(false);
  };
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Keresés"
        variant="outlined"
        inputRef={searchRef}
      />
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleClick}
        onChange={handleClick}
      >
        Keresés
      </Button>
      <Button onClick={() => setIsOpen(true)} startIcon={<CreateIcon />}>
        Szűrés
      </Button>
      {isOpen && (
        <Filter
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          fromRef={fromRef}
          toRef={toRef}
          cityRef={cityRef}
          type={type}
          setType={setType}
          homeOffice={homeOffice}
          setHomeOffice={setHomeOffice}
        />
      )}
      {!isLoading && (
        <JobListings jobs={filteredJobs.length === 0 ? jobs : filteredJobs} />
      )}
    </>
  );
}

export default Home;
