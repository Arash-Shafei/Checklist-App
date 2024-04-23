import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function TemplateLog() {
  let { id } = useParams();

  const demo_logs = [
    {
      id: 1,
      date: "2020-06-12",
      author: "Mark",
      type: "ADD",
      description: "2022-02-14",
    },
    {
      id: 2,
      date: "2021-05-14",
      author: "Adam",
      type: "REMOVE",
      description: "2022-02-14",
    },
    {
      id: 3,
      date: "2022-02-11",
      author: "Adam",
      type: "UPDATE",
      description: "2022-02-14",
    },
    {
      id: 4,
      date: "2022-08-14",
      author: "Adam",
      type: "UPDATE",
      description: "2022-02-14",
    },
    {
      id: 5,
      date: "2022-10-08",
      author: "Mark",
      type: "REMOVE",
      description: "2022-02-14",
    },
    {
      id: 6,
      date: "2022-11-23",
      author: "Lisa",
      type: "ADD",
      description: "2022-02-14",
    },
  ];

  const [logs, setLogs] = useState(demo_logs);
  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleAuthorChange = (event) => {
    setAuthorFilter(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const allAuthors = useMemo(() => {
    const authors = new Set(logs.map((log) => log.author));
    return Array.from(authors);
  }, [logs]); // Dependency on projects ensures this updates if projects data changes

  const allTypes = useMemo(() => {
    const types = new Set(logs.map((log) => log.type));
    return Array.from(types);
  }, [logs]); // Dependency on projects ensures this updates if projects data changes

  const clearFilters = () => {
    setAuthorFilter("");
    setTypeFilter("");
    setLogs(demo_logs); // Reset to initial if you are also clearing sorts
  };

  const filteredLogs = logs.filter((log) => {
    return (
      (typeFilter ? log.type === typeFilter : true) &&
      (authorFilter ? log.author === authorFilter : true)
    );
  });

  return (
    <>
      <h1>Here you will see the template logs for {id}</h1>
      <Select value={authorFilter} onChange={handleAuthorChange} displayEmpty>
        <MenuItem value="">All Authors</MenuItem>
        {allAuthors.map((author) => (
          <MenuItem key={author} value={author}>
            {author}
          </MenuItem>
        ))}
      </Select>
      <Select value={typeFilter} onChange={handleTypeChange} displayEmpty>
        <MenuItem value="">All Types</MenuItem>
        {allTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={clearFilters} variant="outlined">
        Clear Filters
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Change Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell component="th" scope="row">
                  {log.date}
                </TableCell>
                <TableCell>{log.author}</TableCell>
                <TableCell>{log.type}</TableCell>
                <TableCell>{log.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button>Export CSV</Button>
      <Button>Download PDF</Button>
    </>
  );
}

export default TemplateLog;
