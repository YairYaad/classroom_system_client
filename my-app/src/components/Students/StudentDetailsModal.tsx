import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    DialogActions,
    TextField,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from 'react';
import type { IStudent } from '../../interface/student.interface';
import { unassignStudent, deleteStudent, assignStudentToClass } from '../../services/classes.service';
import { useQueryClient } from 'react-query'; // Ensure this is imported

interface StudentDetailsModalProps {
    open: boolean;
    onClose: () => void;
    student: IStudent | null;
    classData: any; 
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ 
    open, 
    onClose, 
    student, 
    classData
}) => {
    const queryClient = useQueryClient();
    const [selectedClassId, setSelectedClassId] = useState('');
    
    if (!student) return null;
    
    const currentClass = student.classId 
        ? classData.find((c: any) => c.id === student.classId) 
        : null;

    const invalidateQueries = () => {
        // Essential for instantly refreshing the Students table and the Class list view
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('classes');
    };

    const handleDeleteStudent = async () => {
        if (confirm(`Are you sure you want to delete student ${student.firstName}?`)) {
            await deleteStudent(student.id);
            invalidateQueries(); // REFRESH DATA
            onClose();
        }
    };

    const handleUnassignStudent = async () => {
        if (confirm(`Are you sure you want to unassign ${student.firstName} from ${currentClass.className}?`)) {
            await unassignStudent(student.id);
            invalidateQueries(); // REFRESH DATA
            onClose();
        }
    };
    
    const handleAssignStudent = async () => {
        if (!selectedClassId) {
            alert("Please enter a Class ID to assign.");
            return;
        }
        await assignStudentToClass(student.id, selectedClassId);
        invalidateQueries(); // REFRESH DATA
        alert(`Student assigned to class ID: ${selectedClassId}. Check the table.`);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Student Details: {student.firstName} {student.lastName}
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6">Personal Information</Typography>
                <Typography>ID: {student.id}</Typography>
                <Typography>Age: {student.age}</Typography>
                <Typography gutterBottom>Profession: {student.profession}</Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Class Assignment</Typography>
                {currentClass ? (
                    <List disablePadding>
                        <ListItem secondaryAction={
                            <Button
                                size="small"
                                startIcon={<RemoveCircleIcon />}
                                color="warning"
                                onClick={handleUnassignStudent}
                            >
                                Unassign
                            </Button>
                        }>
                            <ListItemText primary={currentClass.className} secondary={`Teacher: ${currentClass.teacherName || 'TBD'}`} />
                        </ListItem>
                    </List>
                ) : (
                    <Typography color="textSecondary">Currently not assigned to any class.</Typography>
                )}
                
                {/* NEW ASSIGNMENT SECTION */}
                {!currentClass && (
                    <>
                        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Assign Student</Typography>
                        <TextField 
                            fullWidth
                            label="Enter Class ID to Assign" 
                            value={selectedClassId} 
                            onChange={(e) => setSelectedClassId(e.target.value)} 
                            size="small"
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleAssignStudent}
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Assign Student
                        </Button>
                    </>
                )}
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button 
                    startIcon={<DeleteIcon />} 
                    color="error"
                    onClick={handleDeleteStudent}
                >
                    Delete Student
                </Button>
            </DialogActions>
        </Dialog>
    );
};