import { useQuery } from 'react-query';
import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Box } from '@mui/material'; // Imported Button and Box
import type { IStudent } from '../../interface/student.interface';
import { fetchAllStudents, fetchClasses } from '../../services/classes.service';
import { StudentDetailsModal } from '../../components/Students/StudentDetailsModal';
import { useNavigate } from 'react-router-dom'; // NEW IMPORT for navigation

export const Students = () => {
    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Fetch all students
    const { data: studentsData = [], isLoading: studentsLoading, error: studentsError } = useQuery<IStudent[]>({
        queryKey: ['students'],
        queryFn: fetchAllStudents,
    });
    
    // Fetch classes data (needed for the modal to resolve class name from classId)
    const { data: classesData = [], isLoading: classesLoading } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => fetchClasses(),
    });


    const handleRowClick = (student: IStudent) => {
        setSelectedStudent(student);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedStudent(null);
    };
    
    // NEW: Handler to navigate to the create page
    const handleCreateStudent = () => {
        navigate('/create');
    }


    if (studentsLoading || classesLoading) return <div>Loading student and class data...</div>;
    if (studentsError) return <div>An error occurred while fetching students.</div>;

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <h1>Students Management</h1>
                {/* NEW CREATE BUTTON */}
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCreateStudent}
                >
                    Create New Student
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="students table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Profession</TableCell>
                            <TableCell>Current Class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentsData.map((student) => {
                            const currentClass = classesData.find((c: any) => c.id === student.classId);
                            return (
                                <TableRow 
                                    key={student.id} 
                                    hover 
                                    onClick={() => handleRowClick(student)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                                    <TableCell>{student.profession}</TableCell>
                                    <TableCell>
                                        {currentClass ? (
                                            <Typography variant="body2" color="primary">
                                                {currentClass.className}
                                            </Typography>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                Unassigned
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <StudentDetailsModal 
                open={openModal} 
                onClose={handleCloseModal} 
                student={selectedStudent} 
                classData={classesData}
            />
        </div>
    );
}