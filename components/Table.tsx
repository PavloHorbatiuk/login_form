import React, { useEffect, useState } from "react";
import { TableList } from "./TableList/TableList";
import { usersAPI } from "@/api";
export interface UserType {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

function Table() {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await usersAPI.getUsers();
      if (data) {
        setUsers(data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await usersAPI.deleteUser(id);
      // Refresh the user list after successful deletion
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = async (id: number) => {
    // Implement your edit logic here, e.g., open a dialog for editing.
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="">
      <TableList
        fetchUsers={fetchUsers}
        users={users}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}

export default Table;
