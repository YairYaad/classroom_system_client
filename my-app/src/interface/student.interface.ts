export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profession: string; // FIX: Corrected typo from 'proffesion'
  classId: string | null;
}

export interface StudentProps {
  open: boolean;
  students: IStudent[] | null;
  onClose: (value: string) => void;
  seatsLeft: number
}

export interface ClassCardProps {
  className: string;
  totalPlaces: number;
  classId: string;
  students: IStudent[];
}

// FIX: Corrected interface name
export interface StudentsForClassProps { 
  open: boolean;
  onClose: () => void;
  student: IStudent;
}

export interface Data {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profession: string; // FIX: Corrected typo from 'proffesion'
}

export interface ColumnData {
  dataKey: keyof Data | "assign" | "delete";
  label: string;
  numeric?: boolean;
  width?: number;
}