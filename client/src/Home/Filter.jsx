import {
  Button,
  TextField,
  OutlinedInput,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useRef } from "react";

function Filter({
  setIsOpen,
  setIsFiltering,
  handleSubmit,
  setFrom,
  from,
  setTo,
  to,
  setCity,
  city,
  type,
  setType,
  homeOffice,
  setHomeOffice,
}) {
  const handleClick = () => {
    setFrom("");
    setTo("");
    setCity("");
    setType("");
    setHomeOffice(false);
    setIsFiltering(false);
    setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Szűrők</h2>
      <p>Fizetési sáv alja</p>
      <TextField
        value={from}
        variant="standard"
        type="number"
        id="from"
        label="-tól"
        onChange={(e) => setFrom(e.target.value)}
      />
      <p>Fizetési sáv teteje</p>
      <TextField
        value={to}
        variant="standard"
        type="number"
        id="to"
        label="-ig"
        onChange={(e) => setTo(e.target.value)}
      />
      <p>Foglalkoztatás formája</p>
      <TextField
        id="select"
        variant="standard"
        value={type}
        label="Foglalkoztatás formája"
        select
        sx={{ minWidth: 200 }}
        onChange={(e) => setType(e.target.value)}
        input={<OutlinedInput label="Foglalkoztatás formája" />}
      >
        <MenuItem value={"full-time"}>Teljes állás</MenuItem>
        <MenuItem value={"part-time"}>Részmunkaidős</MenuItem>
        <MenuItem value={"internship"}>Gyakornoki</MenuItem>
      </TextField>
      <p>Település</p>
      <TextField
        value={city}
        variant="standard"
        type="text"
        id="city"
        label="Település"
        onChange={(e) => setCity(e.target.value)}
      />
      <Checkbox
        onChange={(e) => setHomeOffice(e.target.checked)}
        checked={homeOffice}
        id="homeOffice"
      />
      Home Office lehetőség
      <Button type="submit">Szűrés</Button>
      <Button onClick={handleClick}>Bezár</Button>
    </form>
  );
}

export default Filter;
