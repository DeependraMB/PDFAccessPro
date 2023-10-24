import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

const columns = [
  { id: "serialNumber", label: "Serial No.", minWidth: 50 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

export default function PDFManagement() {
  const [pdfs, setPDFs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/get-pdf");
        console.log(response.data);
        setPDFs(
          response.data.map((pdf, index) => ({
            serialNumber: index + 1,
            title: pdf.title,
            status: pdf.isLocked ? (
              <Button variant="contained" color="primary">
                Locked
              </Button>
            ) : (
              <Button variant="contained" color="secondary">
                Unlocked
              </Button>
            ),
            action: pdf.isLocked ? (
              <Link to={`/payment/${pdf._id}`}> {/* Use the Link component with pdf._id */}
                <Button variant="contained" color="primary">
                  Buy
                </Button>
              </Link>
            ) : (
              <Button variant="contained" color="secondary">
                View PDF
              </Button>
            ),
          }))
        );
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 545 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      position: "sticky",
                      top: 0,
                      backgroundColor: "white",
                      zIndex: 100,
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pdfs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.serialNumber}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 25, 100]}
          component="div"
          count={pdfs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
