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
  const [nextPage, setNextPage] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await usersAPI.getUsers();
      if (data) {
        setUsers(data.results);
        setNextPage(data.next);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="">
      <TableList fetchUsers={fetchUsers} users={users} nextPage={nextPage} />
    </div>
  );
}

export default Table;
