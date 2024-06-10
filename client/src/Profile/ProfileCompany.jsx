import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  Chip,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  CardActions,
  IconButton,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaidIcon from "@mui/icons-material/Paid";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobByUserQuery } from "../state/api/jobApiSlice";
import { useEffect } from "react";
function ProfileCompany() {
  const { userId } = useParams();
  const {
    data: jobs,
    isLoading,
    error,
    refetch,
  } = useGetJobByUserQuery(userId);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profilom
        </Typography>
        <Typography variant="h6" gutterBottom>
          A te hirdetéseid:
        </Typography>
        {!isLoading &&
          jobs.map((job) => (
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  {job.position}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                  <Chip icon={<WorkIcon />} label={job.type} />
                  <Chip icon={<LocationOnIcon />} label={job.city} />
                  <Chip
                    icon={<PaidIcon />}
                    label={`${new Intl.NumberFormat("hu-HU", {
                      style: "currency",
                      currency: "HUF",
                      maximumSignificantDigits: 6,
                    }).format(job.salaryFrom)} - ${new Intl.NumberFormat(
                      "hu-HU",
                      {
                        style: "currency",
                        currency: "HUF",
                        maximumSignificantDigits: 6,
                      }
                    ).format(job.salaryTo)}`}
                  />
                </Stack>
              </CardContent>
              <CardActions>
                <IconButton color="primary">
                  <CreateIcon />
                  Szerkesztés
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/applicants/${job.id}`)}
                >
                  <VisibilityIcon />
                  Megtekintés
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                  Törlés
                </IconButton>
              </CardActions>
            </Card>
          ))}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/new")}
          >
            Hirdetés hozzáadása
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default ProfileCompany;
