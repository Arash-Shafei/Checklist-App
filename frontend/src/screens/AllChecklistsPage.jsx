import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

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

function AllChecklists() {
  let { id } = useParams();
  let navigate = useNavigate();

  const demo_checklists = [
    {
      id: 1,
      name: "CHK_A",
      completion: 75,
    },
    {
      id: 2,
      name: "CHK_B",
      completion: 20,
    },
    {
      id: 3,
      name: "CHK_C",
      completion: 50,
    },
    {
      id: 4,
      name: "CHK_D",
      completion: 62,
    },
  ];

  const [checklists, setChecklists] = useState(demo_checklists);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortChecklists = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedChecklists = [...checklists].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setChecklists(sortedChecklists);
    setSortConfig({ key, direction });
  };
  return (
    <>
      <h1>Here you will see the all of the individual checklists for {id}</h1>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <TableContainer component={Paper}>
        <Table border={1}>
          <TableHead style={{ backgroundColor: "#D5D5D5" }}>
            <TableRow>
              <TableCell onClick={() => sortChecklists("name")}>
                <strong>Project Name</strong>
              </TableCell>
              <TableCell onClick={() => sortChecklists("completion")}>
                <strong>Completion Percentage</strong>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checklists.map((chk) => (
              <TableRow key={chk.id}>
                <TableCell component="th" scope="row">
                  <Link to={`/checklist/${chk.name}`}>{chk.name}</Link>
                </TableCell>
                <TableCell>{`${chk.completion}%`}</TableCell>
                <TableCell>
                  <Link to={`/checklist-log/${chk.name}`}>
                    <Button>Checklist Log</Button>
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

export default AllChecklists;
