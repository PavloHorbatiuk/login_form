import React, { useState } from "react";
import { Paper, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditModal from "../EditModal";
import { UserType } from "../Table";
import { usersAPI } from "@/api";
import axios from "axios";

interface IProps {
  users: UserType[];
  fetchUsers: () => void;
  nextPage: string;
}

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
    description: "This column has a value getter and is not sortable.",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "birthday_date",
    headerName: "Birth date",
    type: "string",
    width: 100,
    editable: true,
  },
  {
    field: "phone_number",
    headerName: "Phone number",
    type: "string",
    sortable: false,
    width: 150,
  },
  {
    field: "address",
    headerName: "Adress",
    type: "string",
    width: 250,
    editable: true,
  },
];

export const TableList = ({ users, fetchUsers, nextPage }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserType | null>(null);
  const [validInfo, setvalidInfo] = useState({ name: "", validInfo: "" });

  const handleEditClick = (params: { row: UserType }) => {
    setIsModalOpen(true);
    setSelectedRow(params.row);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setvalidInfo((prev) => {
      return { ...prev, validInfo: "" };
    });
  };

  const handleFieldChange = (field: string, value: string) => {
    setSelectedRow((prevRow) => {
      if (prevRow) {
        return { ...prevRow, [field]: value } as UserType;
      }
      return prevRow;
    });
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedRow) {
        const response = await usersAPI.updateUser(selectedRow.id, selectedRow);
        if (response.status === 200) {
          fetchUsers();
          handleCloseModal();
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: Record<string, any> = error?.response?.data;
        for (const [key, value] of Object.entries(message)) {
          setvalidInfo({ validInfo: value, name: key });
        }
      }
    }
  };

  return (
    <>
      <div className="p-5 justify-center flex items-center">
        <Paper>
          <Box sx={{ height: 600 }}>
            <DataGrid
              rows={users}
              columns={columns}
              onRowClick={handleEditClick}
              paginationMode="server"
              sx={{
                ".MuiTablePagination-displayedRows": {
                  display: "none",
                },
              }}

              // onRowDeleteClick={handleDeleteClick}
            />
          </Box>
        </Paper>
      </div>

      <EditModal
        validInfo={validInfo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedRow={selectedRow}
        handleFieldChange={handleFieldChange}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};
