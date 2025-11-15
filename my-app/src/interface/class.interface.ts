import type { IStudent } from "./student.interface";

// NEW: Interface for the class schedule data
export interface ISchedule {
  day: string;
  time: string; // e.g., "10:00 - 11:30"
  room: string; // e.g., "Room 302"
}

export interface IClass {
    id: string;
    className: string;
    totalPlaces: number;
    students: IStudent[];
    
    // NEW FIELDS for enhanced Class Card
    subject: string;
    teacherName: string;
    schedule: ISchedule[]; // For the calendar/schedule view
}

export interface StudentsListInClassProps {
    open: boolean;
    onClose: () => void;
    classId: string;
    students: IStudent[];
}