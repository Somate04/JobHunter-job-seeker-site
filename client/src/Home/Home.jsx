import { useRef, useState } from "react";
import {
  useGetAllJobsQuery,
  useGetFilterJobsQuery,
} from "../state/api/jobApiSlice";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import JobListings from "./JobListings";
import Filter from "./Filter";

function Home() {
  const { data: jobs, isLoading } = useGetAllJobsQuery();
  const [isOpen, setIsOpen] = useState(false);

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [homeOffice, setHomeOffice] = useState(false);

  const { data: filteredJobs, isFilteredLoading } = useGetFilterJobsQuery(
    from,
    to,
    type,
    city,
    homeOffice
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    !isFilteredLoading && console.log(filteredJobs);
    setIsOpen(false);
  };
  return (
    <>
      <TextField id="outlined-basic" label="Keresés" variant="outlined" />
      <Button variant="contained" startIcon={<SearchIcon />}>
        Keresés
      </Button>
      <Button onClick={() => setIsOpen(true)} startIcon={<CreateIcon />}>
        Szűrés
      </Button>
      {isOpen && (
        <Filter
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          setFrom={setFrom}
          setTo={setTo}
          setCity={setCity}
          type={type}
          setType={setType}
          homeOffice={homeOffice}
          setHomeOffice={setHomeOffice}
        />
      )}
      {!isLoading && !isFilteredLoading && <JobListings jobs={jobs} />}
    </>
  );
}

export default Home;
