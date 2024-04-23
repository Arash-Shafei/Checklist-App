import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function TemplateEditorPage() {
  let { name } = useParams();

  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Section 1.0",
      rows: [
        [1.01, "Do X"],
        [1.02, "Do Y"],
      ],
      notes: "This is a dummy-note",
    },
    {
      id: 2,
      name: "Section 2.0",
      rows: [[2.01, "Do Z"]],
      notes: "",
    },
  ]);

  const addRow = (sectionId, rowIndex) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newRows = [...section.rows];
          let newItemNumber;
          if (rowIndex === section.rows.length - 1) {
            // Adding after the last item
            const lastItemNumber = section.rows[section.rows.length - 1][0];
            newItemNumber = Math.floor(lastItemNumber) + 0.01;
          } else {
            // Adding between items
            const nextItemNumber = section.rows[rowIndex + 1][0];
            const currentItemNumber = section.rows[rowIndex][0];
            newItemNumber = ((nextItemNumber + currentItemNumber) / 2).toFixed(
              2
            );
          }
          newRows.splice(rowIndex + 1, 0, [newItemNumber, ""]);
          return { ...section, rows: newRows };
        }
        return section;
      })
    );
  };

  const removeRow = (sectionId, rowIndex) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newRows = [...section.rows];
          newRows.splice(rowIndex, 1);
          return { ...section, rows: newRows };
        }
        return section;
      })
    );
  };

  const addSection = () => {
    const newSectionId = sections.length + 1;
    const newSection = {
      id: newSectionId,
      name: `Section ${newSectionId}.0`,
      rows: [["", "", ""]],
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleCellChange = (sectionId, rowIndex, cellIndex, value) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newRows = section.rows.map((row, rIndex) => {
            if (rIndex === rowIndex) {
              const newRow = [...row];
              newRow[cellIndex] = value;
              return newRow;
            }
            return row;
          });
          return { ...section, rows: newRows };
        }
        return section;
      })
    );
  };

  const handleNotesChange = (sectionId, value) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, notes: value };
        }
        return section;
      })
    );
  };

  return (
    <>
      <Typography variant="h4">Edit Template for {name}</Typography>
      {sections.map((section) => (
        <TableContainer
          component={Paper}
          key={section.id}
          style={{ marginBottom: "20px" }}
        >
          <Typography variant="h6">{section.name}</Typography>
          <Table>
            <TableBody>
              <TextField
                label="Notes"
                multiline
                fullWidth
                variant="outlined"
                value={section.notes}
                onChange={(e) => handleNotesChange(section.id, e.target.value)}
                margin="normal"
              />
              {section.rows.map((row, rowIndex) => (
                <TableRow key={`${section.id}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={`${section.id}-${rowIndex}-${cellIndex}`}>
                      <TextField
                        value={cell}
                        onChange={(e) =>
                          handleCellChange(
                            section.id,
                            rowIndex,
                            cellIndex,
                            e.target.value
                          )
                        }
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={() => addRow(section.id, rowIndex)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => removeRow(section.id, rowIndex)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={() => addSection()}>Add Section</Button>
          {sections.length > 1 && (
            <Button onClick={() => removeSection(section.id)}>
              Remove Section
            </Button>
          )}
        </TableContainer>
      ))}
      <Button variant="contained" color="primary">
        Finish Template
      </Button>
    </>
  );
}

export default TemplateEditorPage;
