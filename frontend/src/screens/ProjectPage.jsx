import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "react-bootstrap";

function ProjectPage() {
  // Example hardcoded data for groups
  const groups_PL = [
    { id: "PKO", name: "PKO" },
    { id: "PDK KO", name: "PDK KO" },
    { id: "DR0", name: "DR0" },
    { id: "DR1", name: "DR1" },
    { id: "DR2", name: "DR2" },
    { id: "V Plan", name: "V Plan" },
    { id: "MDL", name: "MDL" },
    { id: "Macro Delivery", name: "Macro Delivery" },
    { id: "ESD Strategy", name: "ESD Strategy" },
    { id: "ESD Final", name: "ESD Final" },
  ];

  const groups_BL = [
    { id: "ESD Preliminary", name: "ESD Preliminary" },
    { id: "ESD Final", name: "ESD Final" },
    { id: "SPR", name: "SPR" },
    { id: "CDR", name: "CDR" },
    { id: "FDR", name: "FDR" },
    { id: "DR3", name: "DR3" },
  ];

  return (
    <>
      <h1>Project_Name</h1>
      <Link to="/create-project">
        <Button>Edit Project (This only appears for admins)</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Level</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups_PL.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <Link
                    to={`/group/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Go to Group
                  </Link>{" "}
                </TableCell>
                <TableCell>
                  <Link
                    to={`/template-log/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Go to Template Log
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Block Level</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups_BL.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <Link
                    to={`/summary/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Go to Summary
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/group/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Go to Group
                  </Link>{" "}
                </TableCell>
                <TableCell>
                  <Link
                    to={`/template-log/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Go to Template Log
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProjectPage;
