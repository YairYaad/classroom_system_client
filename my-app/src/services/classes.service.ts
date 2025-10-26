import axios from "axios";
import type { IStudent } from "../interface/student.interface";
import type { IClass } from "../interface/class.interface";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});
export const fetchClasses = async () => {
  const response = await api.get("/classes");
  return response.data;
};

export const deleteClass = async (id: string): Promise<void> => {
  await api.delete(`/classes/${id}`);
};

export const addClass = async (newClass: {
  id: string;
  className: string;
  totalPlaces: number;
}) => {
  const response = await api.post("/classes", newClass);
  return response.data;
};

export const unassignStudent = async (studentId: string) => {
  const response = await api.patch(`/students/unassign/${studentId}`, {
    classId: null,
  });
  return response.data;
};
export const fetchStudentsForClass = async (
  classId: string
): Promise<IStudent[]> => {
  const response = await api.get(`/classes/students/${classId}`);
  return response.data;
};
