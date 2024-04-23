import { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

  const [selectedOption, setSelectedOption] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [analogList, setAnalogList] = useState([]);
  const [digitalList, setDigitalList] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isAnalogTableCollapsed, setIsAnalogTableCollapsed] = useState(false);
  const [isDigitalTableCollapsed, setIsDigitalTableCollapsed] = useState(false);
  const [isPLTableCollapsed, setIsPLTableCollapsed] = useState(false);

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // Specify the range to skip the first row which is usually the headers
    const range = XLSX.utils.decode_range(worksheet["!ref"]); // Decode the range of the worksheet
    range.s.r = 1; // Start reading from the second row (row index 1)
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { range, header: 1 });
    const analog = jsonData.map((row) => row[0]).filter(Boolean);
    const digital = jsonData.map((row) => row[1]).filter(Boolean);
    setAnalogList(analog);
    setDigitalList(digital);
    setFileUploaded(true);
    event.target.value = "";
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    // Do something with the selected option
    console.log("Selected option:", selectedOption);
  };

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
        <h1>Upload Checklist Excel Sheet</h1>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileRead} />
      </div>
      <div>
        <h1>Or choose from existing projects</h1>
        <FormControl style={{ width: "200px" }}>
          <InputLabel>Select an existing template</InputLabel>
          <Select value={selectedOption} onChange={handleChange}>
            <MenuItem value="option1">Project 1</MenuItem>
            <MenuItem value="option2">Project 2</MenuItem>
            <MenuItem value="option3">Project 3</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleButtonClick} variant="contained" color="primary">
          Confirm
        </Button>
      </div>

      {fileUploaded && (
        <>
          <div>
            <h1>Click TOP-LEFT of tables to collapse</h1>
          </div>

          <TextField
            label="Project Name"
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={{ margin: "20px 0" }}
          />
          <TextField
            label="Project Type"
            variant="outlined"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            style={{ margin: "20px 0" }}
          />

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
                  {analogList.map((checklist) => (
                    <TableRow key={checklist.id}>
                      <TableCell>{checklist}</TableCell>
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
                  {digitalList.map((checklist) => (
                    <TableRow key={checklist.id}>
                      <TableCell>{checklist}</TableCell>
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
                    onClick={togglePLTable}
                    style={{ cursor: "pointer" }}
                  >
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
      )}
    </>
  );
}

export default CreateProjectPage;
