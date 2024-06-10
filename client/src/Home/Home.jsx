import { useEffect, useState } from "react";
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
  const {
    data: jobs,
    isLoading,
    error,
    refetch: refetchAllJobs,
  } = useGetAllJobsQuery();
  const [isOpen, setIsOpen] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [homeOffice, setHomeOffice] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const {
    data: filteredJobs,
    isFilteredLoading,
    refetch: refetchFilteredJobs,
  } = useGetFilterJobsQuery({
    from: from,
    to: to,
    type: type,
    city: city,
    homeOffice: homeOffice,
  });

  useEffect(() => {
    if (isFiltering) {
      refetchFilteredJobs();
    } else {
      refetchAllJobs();
    }
  }, [
    from,
    to,
    city,
    type,
    homeOffice,
    isFiltering,
    refetchFilteredJobs,
    refetchAllJobs,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFiltering(true);
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
          setIsFiltering={setIsFiltering}
          handleSubmit={handleSubmit}
          setFrom={setFrom}
          from={from}
          setTo={setTo}
          to={to}
          setCity={setCity}
          city={city}
          type={type}
          setType={setType}
          homeOffice={homeOffice}
          setHomeOffice={setHomeOffice}
        />
      )}
      {!isLoading && !isFilteredLoading && (
        <JobListings jobs={!isFiltering ? jobs : filteredJobs} />
      )}
    </>
  );
}

export default Home;
