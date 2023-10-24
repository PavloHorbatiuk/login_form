import { UserType } from "@/components/Table";
import { FormValues } from "@/components/login/LoginForm";
import axios from "axios";

const instance = axios.create({
  baseURL: `https://technical-task-api.icapgroupgmbh.com/api/`,
  withCredentials: false,
});
export const authAPI = {
  logIn(formValues: FormValues) {
    return instance.post(`/login/`, formValues);
  },
};
export const usersAPI = {
  getUsers() {
    return instance.get(`table`);
  },
  deleteUser(id: number) {
    return instance.delete(`table/${id}/`);
  },
  updateUser(id: number, user: UserType) {
    return instance.patch(`table/${id}/`, user);
  },
  addUser(user: UserType) {
    return instance.post(`table`, user);
  },
};
