import { useState } from "react";
import { Link } from "react-router-dom";
import { Button as MUIButton } from "@mui/material"; // Corrected import for Material-UI button
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
import { Button } from "react-bootstrap"; // Keep if needed for other purposes

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

  const [checkboxStates, setCheckboxStates] = useState({});
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

  const checklists = Array.from({ length: 10 }, (_, index) => ({
    id: `checklist_${index + 1}`,
    name: `Checklist ${index + 1}`,
  }));

  // Toggle functionality for a whole column in a specific table
  const toggleColumn = (table, groupId) => {
    const newState = {};
    const allChecked = checklists.every(
      (checklist) =>
        checkboxStates[`${table}_${groupId}_${checklist.id}`] === true
    );
    checklists.forEach((checklist) => {
      newState[`${table}_${groupId}_${checklist.id}`] = !allChecked;
    });
    setCheckboxStates((prev) => ({ ...prev, ...newState }));
  };

  return (
    <>
      <div>
        <h1>Click on the table header to collapse table</h1>
      </div>

      {["Analog", "Digital"].map((tableType) => (
        <TableContainer component={Paper} key={tableType}>
          <Table>
            <TableHead>
              <TableRow
                onClick={
                  tableType === "Analog"
                    ? toggleAnalogTable
                    : toggleDigitalTable
                }
                style={{ cursor: "pointer" }}
              >
                <TableCell>{`Block-Level ${tableType}`}</TableCell>
                {groups_BL.map((group) => (
                  <TableCell key={group.id}>
                    {group.name}
                    <MUIButton
                      size="small"
                      onClick={() => toggleColumn(tableType, group.id)}
                    >
                      Toggle All
                    </MUIButton>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!isAnalogTableCollapsed && tableType === "Analog" && (
              <TableBody>
                {checklists.map((checklist) => (
                  <TableRow key={checklist.id}>
                    <TableCell>{checklist.name}</TableCell>
                    {groups_BL.map((group) => (
                      <TableCell key={`${group.id}_${checklist.id}`}>
                        <Checkbox
                          checked={
                            !!checkboxStates[
                              `${tableType}_${group.id}_${checklist.id}`
                            ]
                          }
                          onChange={() => {
                            const key = `${tableType}_${group.id}_${checklist.id}`;
                            setCheckboxStates((prev) => ({
                              ...prev,
                              [key]: !prev[key],
                            }));
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ))}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow onClick={togglePLTable} style={{ cursor: "pointer" }}>
              <TableCell></TableCell>
              {groups_PL.map((group) => (
                <TableCell key={group.id}>
                  {group.name}
                  <MUIButton
                    size="small"
                    onClick={() => toggleColumn("PL", group.id)}
                  >
                    Toggle All
                  </MUIButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isPLTableCollapsed && (
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                {groups_PL.map((group) => (
                  <TableCell key={`${group.id}`}>
                    <Checkbox
                      checked={!!checkboxStates[`PL_${group.id}`]}
                      onChange={() => {
                        const key = `PL_${group.id}`;
                        setCheckboxStates((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }));
                      }}
                    />
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
