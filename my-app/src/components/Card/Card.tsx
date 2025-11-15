import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { IStudent } from "../../interface/student.interface";
import type { ISchedule } from "../../interface/class.interface";
import { ClassListOfStudents } from "../ClassListOfStudents/ClassListOfStudents";
import { ScheduleModal } from "./ScheduleModal";
import { useState } from "react";
import useStyles from "./Card.styles";

interface CardProps {
  name: string;
  subject: string;
  teacherName: string;
  numStudents: number;
  students: IStudent[] | undefined;
  schedule: ISchedule[];
  onDelete: (id: string) => void;
  classId: string;
  onScheduleUpdate: (classId: string, newSchedule: ISchedule[]) => void; // NEW PROP
}

const CardComponet: React.FC<CardProps> = ({ 
    name, 
    subject, 
    teacherName, 
    numStudents, 
    students,
    schedule,
    onDelete,
    classId,
    onScheduleUpdate // Destructured NEW PROP
  }) => {
  const [open, setOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const styles = useStyles()
  
  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };
  
  const handleScheduleOpen = () => {
    setScheduleOpen(true);
  }
  
  const handleScheduleClose = () => {
    setScheduleOpen(false);
  }
  
  // Wrapper function to close modal after saving
  const handleSaveWrapper = (id: string, newSchedule: ISchedule[]) => {
    onScheduleUpdate(id, newSchedule);
    handleScheduleClose();
  }

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name} - {subject}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Teacher: {teacherName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of Students: {numStudents}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDialogOpen}>View Students</Button>
        
        <Button 
          size="small" 
          startIcon={<CalendarTodayIcon />}
          onClick={handleScheduleOpen}
          className={styles.scheduleButton}
        >
          Schedule
        </Button>

        <Button 
          size="small" 
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(classId)}
        >
          Delete Class
        </Button>
      </CardActions>

      <ClassListOfStudents 
        open={open} 
        handleClose={handleDialogOpen} 
        students={students} 
        classId={classId} 
      />
      
      {/* Schedule Editor Modal Rendering */}
      <ScheduleModal 
        open={scheduleOpen} 
        onClose={handleScheduleClose} 
        className={name} 
        schedule={schedule}
        classId={classId}
        onSave={handleSaveWrapper} // Pass the save handler
      />
    </Card>
  );
};

export default CardComponet;