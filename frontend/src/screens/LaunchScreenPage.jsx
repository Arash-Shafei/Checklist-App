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

function LaunchScreen() {
  const initialProjects = [
    {
      id: 1,
      name: "Project-Alpha",
      type: "SerDes",
      creationDate: "2022-02-14",
      lineItems: 10,
      completion: 75,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Project-Beta",
      type: "DDRIO",
      creationDate: "2022-02-15",
      lineItems: 5,
      completion: 99,
      status: "In Progress",
    },
    {
      id: 3,
      name: "Project-Gamma",
      type: "DDRIO",
      creationDate: "2020-03-20",
      lineItems: 20,
      completion: 98,
      status: "In Progress",
    },
    {
      id: 4,
      name: "Project-Charlie",
      type: "SerDes",
      creationDate: "2018-03-20",
      lineItems: 87,
      completion: 61,
      status: "In Progress",
    },
    {
      id: 5,
      name: "Project-Zebra",
      type: "Controller",
      creationDate: "2000-03-20",
      lineItems: 200,
      completion: 100,
      status: "Completed",
    },
    {
      id: 6,
      name: "Project-Omega",
      type: "DDRIO",
      creationDate: "2016-03-20",
      lineItems: 90,
      completion: 12,
      status: "In Progress",
    },
    {
      id: 7,
      name: "Project-Delta",
      type: "Controller",
      creationDate: "2019-03-20",
      lineItems: 67,
      completion: 45,
      status: "In Progress",
    },
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const projectTypes = useMemo(() => {
    const types = new Set(projects.map((project) => project.type));
    return Array.from(types);
  }, [projects]); // Dependency on projects ensures this updates if projects data changes

  const clearFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
    setProjects(initialProjects); // Reset to initial if you are also clearing sorts
  };

  const filteredProjects = projects.filter((project) => {
    return (
      (typeFilter ? project.type === typeFilter : true) &&
      (statusFilter
        ? statusFilter === "Completed"
          ? project.status === "Completed"
          : project.status !== "Completed"
        : true)
    );
  });

  const sortProjects = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedProjects = [...projects].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setProjects(sortedProjects);
    setSortConfig({ key, direction });
  };

  return (
    <>
      <Link to="/create-project">
        <Button>
          Create New Project (This button will ONLY appear for ADMINS)
        </Button>
      </Link>
      <br />
      <Select value={typeFilter} onChange={handleTypeChange} displayEmpty>
        <MenuItem value="">All Types</MenuItem>
        {projectTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <Select value={statusFilter} onChange={handleStatusChange} displayEmpty>
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Not Completed">Not Completed</MenuItem>
      </Select>
      <Button onClick={clearFilters} variant="outlined">
        Clear Filters
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sortProjects("name")}>
                Project Name
              </TableCell>
              <TableCell onClick={() => sortProjects("type")}>
                Project Type
              </TableCell>
              <TableCell onClick={() => sortProjects("creationDate")}>
                Creation Date
              </TableCell>
              <TableCell>Number of Line Items</TableCell>
              <TableCell onClick={() => sortProjects("completion")}>
                Completion Percentage
              </TableCell>
              <TableCell>Completion Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell component="th" scope="row">
                  <Link
                    to={`/project/${project.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>{project.type}</TableCell>
                <TableCell>{project.creationDate}</TableCell>
                <TableCell>{project.lineItems}</TableCell>
                <TableCell>{`${project.completion}%`}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Link to={`/template-manage/${project.name}`}>
                    <Button>Manage Template (Need perms)</Button>
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

export default LaunchScreen;
