import {
  Button,
  TextField,
  OutlinedInput,
  MenuItem,
  Checkbox,
} from "@mui/material";

function Filter({
  setIsOpen,
  handleSubmit,
  fromRef,
  toRef,
  cityRef,
  type,
  setType,
  homeOffice,
  setHomeOffice,
}) {
  const handleChange = (e) => {
    setType(e.target.value);
  };
  const handleCheck = (e) => {
    setHomeOffice(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Szűrők</h2>
      <p>Fizetési sáv alja</p>
      <TextField
        inputRef={fromRef}
        variant="standard"
        type="number"
        id="from"
        label="-tól"
      />
      <p>Fizetési sáv teteje</p>
      <TextField
        inputRef={toRef}
        variant="standard"
        type="number"
        id="to"
        label="-ig"
      />
      <p>Foglalkoztatás formája</p>
      <TextField
        id="select"
        variant="standard"
        value={type}
        label="Foglalkoztatás formája"
        select
        sx={{ minWidth: 200 }}
        onChange={handleChange}
        input={<OutlinedInput label="Foglalkoztatás formája" />}
      >
        <MenuItem value={"full-time"}>Teljes állás</MenuItem>
        <MenuItem value={"part-time"}>Részmunkaidős</MenuItem>
        <MenuItem value={"internship"}>Gyakornoki</MenuItem>
      </TextField>
      <p>Település</p>
      <TextField
        inputRef={cityRef}
        variant="standard"
        type="text"
        id="city"
        label="Település"
      />
      <Checkbox onChange={handleCheck} value={homeOffice} id="homeOffice" />{" "}
      Home Office lehetőség
      <Button type="submit">Szűrés</Button>
      <Button onClick={() => setIsOpen(false)}>Vissza</Button>
    </form>
  );
}

export default Filter;
