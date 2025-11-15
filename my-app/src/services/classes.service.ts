import axios from "axios";
import type { IStudent } from "../interface/student.interface";
import type { IClass, ISchedule } from "../interface/class.interface"; // Ensure ISchedule is imported

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

// --- CLASS SERVICES ---

export const fetchClasses = async (): Promise<IClass[]> => {
  const response = await api.get("/classes");
  return response.data;
};

export const deleteClass = async (id: string): Promise<void> => {
  await api.delete(`/classes/${id}`);
};

export const addClass = async (newClass: Omit<IClass, 'id' | 'students' | 'schedule'>) => {
  const response = await api.post("/classes", newClass);
  return response.data;
};

export const fetchStudentsForClass = async (
  classId: string
): Promise<IStudent[]> => {
  const response = await api.get(`/classes/students/${classId}`);
  return response.data;
};

// NEW: Service call to persist schedule changes
export const updateClassSchedule = async (id: string, schedule: ISchedule[]) => {
    // Calls the new PATCH endpoint defined in the controller
    const response = await api.patch(`/classes/${id}/schedule`, { schedule });
    return response.data;
};


// --- STUDENT SERVICES ---

export const fetchAllStudents = async (): Promise<IStudent[]> => {
    const response = await api.get("/students");
    return response.data;
};

export const addStudent = async (newStudent: Omit<IStudent, 'id' | 'classId'>) => {
    const response = await api.post("/students", newStudent);
    return response.data;
};

export const deleteStudent = async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
};

export const assignStudentToClass = async (studentId: string, classId: string) => {
    const response = await api.patch("/students/assign-to-class", { studentId, classId });
    return response.data;
};

export const unassignStudent = async (studentId: string) => {
    const response = await api.patch(`/students/unassign/${studentId}`); 
    return response.data;
};