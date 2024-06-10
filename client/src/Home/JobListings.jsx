import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function JobListings({ jobs }) {
  const typeSwitch = (type) => {
    switch (type) {
      case "full-time":
        return "Teljes állás";
      case "part-time":
        return "Részmunkaidős";
      case "internship":
        return "Gyakornoki ";
      default:
        return "";
    }
  };
  return (
    <List sx={{ width: "75%" }}>
      {jobs.map((job) => (
        <Link to="/jobdescription">
          <ListItem key={job.id}>
            <ListItemText
              primary={job.position}
              secondary={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ verticalAlign: "top" }}
                  >
                    {job.city}
                  </Typography>
                  <Box textAlign="right">
                    <Typography variant="body2" color="textPrimary">
                      {job.salaryFrom}-{job.salaryTo}Ft
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {typeSwitch(job.type)}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default JobListings;
