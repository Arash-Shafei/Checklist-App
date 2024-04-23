import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { Button } from "react-bootstrap";

function CreateProjectPage() {
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

  const checklists = Array.from({ length: 10 }, (_, index) => ({
    id: `checklist_${index + 1}`,
    name: `Checklist ${index + 1}`,
  }));

  const [isAnalogTableCollapsed, setIsAnalogTableCollapsed] = useState(false);
  const [isDigitalTableCollapsed, setIsDigitalTableCollapsed] = useState(false);
  const [isPLTableCollapsed, setIsPLTableCollapsed] = useState(false);

  const toggleAnalogTable = () => {
    setIsAnalogTableCollapsed(!isAnalogTableCollapsed);
  };

  const toggleDigitalTable = () => {
    setIsDigitalTableCollapsed(!isDigitalTableCollapsed);
  };

  const togglePLTable = () => {
    setIsPLTableCollapsed(!isPLTableCollapsed);
  };

  return (
    <>
      <div>
        <h1>Click TOP-LEFT of tables to collapse</h1>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={toggleAnalogTable}
                style={{ cursor: "pointer" }}
              >
                Block-Level Analog
              </TableCell>
              {groups_BL.map((group) => (
                <TableCell key={group.id}>{group.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isAnalogTableCollapsed && (
            <TableBody>
              {checklists.map((checklist) => (
                <TableRow key={checklist.id}>
                  <TableCell>{checklist.name}</TableCell>
                  {groups_BL.map((group) => (
                    <TableCell key={`${group.id}_${checklist.id}`}>
                      <Checkbox />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <br />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={toggleDigitalTable}
                style={{ cursor: "pointer" }}
              >
                Block-Level Digital
              </TableCell>
              {groups_BL.map((group) => (
                <TableCell key={group.id}>{group.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isDigitalTableCollapsed && (
            <TableBody>
              {checklists.map((checklist) => (
                <TableRow key={checklist.id}>
                  <TableCell>{checklist.name}</TableCell>
                  {groups_BL.map((group) => (
                    <TableCell key={`${group.id}_${checklist.id}`}>
                      <Checkbox />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <br />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={togglePLTable} style={{ cursor: "pointer" }}>
                Project-Level
              </TableCell>
              {groups_PL.map((group) => (
                <TableCell key={group.id}>{group.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isPLTableCollapsed && (
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                {groups_PL.map((group) => (
                  <TableCell key={`${group.id}`}>
                    <Checkbox />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <br />
      <Link to="/">
        <Button>Create Project</Button>
      </Link>
    </>
  );
}

export default CreateProjectPage;
