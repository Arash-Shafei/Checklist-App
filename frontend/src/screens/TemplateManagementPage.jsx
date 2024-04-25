import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function TemplateManagementPage() {
  let { id } = useParams();
  let navigate = useNavigate();

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
      <h1>Here you can manage the template for project {id}</h1>
      <br />
      <Button onClick={() => navigate(-1)}>Back</Button>
      <TableContainer component={Paper} style={{ marginTop: "0px" }}>
        <Table border={1}>
          <TableHead style={{ backgroundColor: "#D5D5D5" }}>
            <TableRow>
              <TableCell>
                <strong>Project Level</strong>
              </TableCell>
              <TableCell></TableCell>
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
                    to={`/template-editor/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Manage Manually
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/template-log/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Open Template Log
                  </Link>
                </TableCell>
                <TableCell>
                  <input type="file" accept=".xlsx, .xls" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <TableContainer component={Paper} style={{ marginTop: "30px" }}>
        <Table border={1}>
          <TableHead style={{ backgroundColor: "#D5D5D5" }}>
            <TableRow>
              <TableCell>
                <strong>Block Level</strong>
              </TableCell>
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
                    to={`/template-editor/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Manage Manually
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/template-log/${group.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Open Template Log
                  </Link>
                </TableCell>
                <TableCell>
                  <input type="file" accept=".xlsx, .xls" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TemplateManagementPage;
