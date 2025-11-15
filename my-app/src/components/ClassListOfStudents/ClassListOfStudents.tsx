import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField, // NEW
  Button, // NEW
  Box, // NEW
  Typography, // NEW
} from "@mui/material";
import type { IStudent } from "../../interface/student.interface";
import { useState } from "react"; // NEW IMPORT
import { useQueryClient } from "react-query"; // NEW IMPORT
import { assignStudentToClass } from "../../services/classes.service"; // NEW IMPORT

interface ClassListOfStudentsProps {
  open: boolean;
  handleClose: () => void;
  students: IStudent[] | undefined;
  classId: string; // CRITICAL: Need to pass the current class ID
}

export const ClassListOfStudents = ({
  open,
  handleClose,
  students,
  classId // Destructured classId
}: ClassListOfStudentsProps) => {
  const [studentIdInput, setStudentIdInput] = useState(''); // NEW STATE for input
  const queryClient = useQueryClient();

  const handleAssignStudent = async () => {
    if (!studentIdInput) {
      alert("Please enter a valid Student ID.");
      return;
    }

    try {
      // Call service to assign student
      await assignStudentToClass(studentIdInput, classId);
      
      // Force refresh of both lists to show the new assignment
      queryClient.invalidateQueries('students');
      queryClient.invalidateQueries('classes');
      
      alert(`Student assigned successfully!`);
      setStudentIdInput(''); // Clear input
      
    } catch (error) {
      alert("Failed to assign student. Check if the ID is valid or if the class is full.");
      console.error(error);
    }
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Students Enrolled in Class</DialogTitle>
      <List sx={{ pt: 0, minWidth: 350 }}>
        {students?.map((student) => (
          <ListItem disablePadding key={student.id}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{student.firstName[0]}</Avatar> 
              </ListItemAvatar>
              <ListItemText 
                primary={`${student.firstName} ${student.lastName}`}
                secondary={`Age: ${student.age}, Profession: ${student.profession}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      {/* NEW ASSIGNMENT SECTION */}
      <Box sx={{ p: 2, borderTop: '1px solid #ccc' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Assign Existing Student</Typography>
        <TextField
          fullWidth
          label="Enter Student ID"
          value={studentIdInput}
          onChange={(e) => setStudentIdInput(e.target.value)}
          size="small"
          sx={{ mb: 1 }}
        />
        <Button 
          fullWidth
          variant="contained"
          color="primary" // Changed color for better visibility
          onClick={handleAssignStudent}
          disabled={!studentIdInput}
        >
          Assign to this Class
        </Button>
      </Box>
    </Dialog>
  );
};