import { useRef, useState } from "react";
import {
  useGetAllJobsQuery,
  useGetJobByPosQuery,
} from "../state/api/jobApiSlice";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import JobListings from "./JobListings";

function Home() {
  const { data: jobs, isLoading } = useGetAllJobsQuery();
  const searchRef = useRef("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchedString, setSearchedString] = useState("");
  const handleClick = () => {
    const search = searchRef.current.value;
    setFilteredJobs(
      jobs.filter((job) =>
        job.position.toLowerCase().startsWith(search.toLowerCase())
      )
    );
    setSearchedString(search);
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
      {!isLoading && (
        <JobListings jobs={searchedString === "" ? jobs : filteredJobs} />
      )}
    </>
  );
}

export default Home;
