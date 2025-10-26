export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  proffesion: string;
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

export interface SutdentsForClassProps {
  open: boolean;
  onClose: () => void;
  student: IStudent;
}
// fix: 2 interfaces
export interface Data {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profession: string;
}
export interface ColumnData {
  dataKey: keyof Data | "assign" | "delete";
  label: string;
  numeric?: boolean;
  width?: number;
}