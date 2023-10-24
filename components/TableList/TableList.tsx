import React, { useState } from "react";
import { Paper, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditModal from "../EditModal";
import { UserType } from "../Table";
import { usersAPI } from "@/api";
import axios, { AxiosError } from "axios";
import { formatDate } from "@/helpers";
import dayjs from "dayjs";

interface IProps {
  users: UserType[];
  handleEditUser: (id: number) => void;
  handleDeleteUser: (id: number) => void;
  fetchUsers: () => void;
}

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
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
    width: 150,
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
    width: 200,
    editable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
  },
];

export const TableList = ({ users, fetchUsers }: IProps) => {
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

  const handleSaveChanges = async () => {
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
    <div className="p-5">
      <Paper>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            onRowClick={handleEditClick}
            // onRowDeleteClick={handleDeleteClick}
          />
        </Box>
      </Paper>
      <EditModal
        validInfo={validInfo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedRow={selectedRow}
        handleFieldChange={handleFieldChange}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};
