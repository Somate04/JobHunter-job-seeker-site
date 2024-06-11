import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  Chip,
  CardContent,
  Stack,
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
import {
  useDeleteJobMutation,
  useGetJobByUserQuery,
} from "../state/api/jobApiSlice";
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
  const [deleteJob] = useDeleteJobMutation();

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  const handleDelete = async (jobId) => {
    await deleteJob(jobId);
    refetch();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "5%" }}>
      <Box sx={{ my: 4 }}>
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
                <IconButton sx={{ color: "#1e293b" }} size="small">
                  <CreateIcon />
                  Szerkesztés
                </IconButton>
                <IconButton
                  sx={{ color: "#1e293b" }}
                  onClick={() => navigate(`/applicants/${job.id}`)}
                  size="small"
                >
                  <VisibilityIcon />
                  Megtekintés
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(job.id)}
                  size="small"
                >
                  <DeleteIcon />
                  Törlés
                </IconButton>
              </CardActions>
            </Card>
          ))}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            sx={{ background: "#1e293b" }}
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
