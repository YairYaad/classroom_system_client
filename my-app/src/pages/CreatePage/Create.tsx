import { Button, TextField, Typography, Box, Paper } from "@mui/material"; // Removed Grid, kept Box and Paper
import { addClass, addStudent } from "../../services/classes.service";
import { useQueryClient } from "react-query";
import { useState } from "react";

export const Create = () => {
    const queryClient = useQueryClient();

    const [studentForm, setStudentForm] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        profession: '',
    });
    // Class form state keys
    const [classForm, setClassForm] = useState({
        className: '',
        totalPlaces: 0,
        subject: '',
        teacherName: '',
    });

    // Handler for all text field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Determine if the field requires an INTEGER value
        const isNumberField = name.endsWith('Age') || name.endsWith('TotalPlaces');
        
        let newValue: string | number = value;

        if (isNumberField) {
            newValue = value === '' ? 0 : parseInt(value) || 0;
        }

        let formType = '';
        if (name.startsWith('student')) {
            formType = 'student';
        } else if (name.startsWith('class') || name === 'className' || name === 'totalPlaces' || name === 'subject' || name === 'teacherName') {
            formType = 'class';
        }

        let fieldName = name;
        if (formType === 'student') {
            // Logic to convert 'studentFirstName' -> 'firstName'
            fieldName = name.replace('student', '');
            fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
            
            setStudentForm(prev => ({ ...prev, [fieldName]: newValue }));

        } else if (formType === 'class') {
            fieldName = name;
            setClassForm(prev => ({ ...prev, [fieldName]: newValue }));
        }
    };

    const handleCreate = async (type: 'class' | 'student') => {
        try {
            if (type === 'class') {
                if (!classForm.className || classForm.totalPlaces <= 0 || !classForm.subject || !classForm.teacherName) {
                    alert("Please fill in all class fields, and ensure Total Places is greater than zero.");
                    return;
                }

                await addClass(classForm);
                alert("Class created successfully! Refreshing list...");
                queryClient.invalidateQueries('classes');
                setClassForm({ className: '', totalPlaces: 0, subject: '', teacherName: '' }); 

            } else {
                if (!studentForm.firstName || !studentForm.lastName || studentForm.age <= 0 || !studentForm.profession) {
                    alert("Please fill in all student fields, and ensure Age is greater than zero.");
                    return;
                }
                
                await addStudent(studentForm);
                alert("Student created successfully! Refreshing list...");
                queryClient.invalidateQueries('students');
                setStudentForm({ firstName: '', lastName: '', age: 0, profession: '' }); 
            }
        } catch (error) {
            alert(`Failed to create ${type}. Check console for details.`);
            console.error(error);
        }
    };

    return (
        <Box sx={{ p: 2, textAlign: 'left' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>Create New Records</Typography>

            {/* NEW: Flexbox container for side-by-side layout on medium/large screens */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: 4, 
                    flexDirection: { xs: 'column', md: 'row' }, /* Stack vertically on small, row on medium+ */
                    maxWidth: 1000, 
                    margin: '0 auto' 
                }}
            >
                
                {/* 1. NEW CLASS FORM */}
                <Paper elevation={4} sx={{ p: 3, bgcolor: '#303f9f', flex: 1 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#b1cce5ff' }}>New Class Creation</Typography>
                    <TextField fullWidth label="Class Name" margin="normal" name="className" value={classForm.className} onChange={handleChange} />
                    <TextField 
                        fullWidth 
                        label="Total Places" 
                        margin="normal" 
                        name="totalPlaces"
                        type="number" 
                        value={classForm.totalPlaces === 0 ? '' : classForm.totalPlaces} 
                        onChange={handleChange} 
                    />
                    <TextField fullWidth label="Subject" margin="normal" name="subject" value={classForm.subject} onChange={handleChange} />
                    <TextField fullWidth label="Teacher Name" margin="normal" name="teacherName" value={classForm.teacherName} onChange={handleChange} />
                    <Button variant="contained" onClick={() => handleCreate('class')} sx={{ mt: 2 }}>Create Class</Button>
                </Paper>
                
                {/* 2. NEW STUDENT FORM */}
                <Paper elevation={4} sx={{ p: 3, bgcolor: '#303f9f', flex: 1 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#b1cce5ff' }}>New Student Registration</Typography>
                    <TextField fullWidth label="First Name" margin="normal" name="studentFirstName" value={studentForm.firstName} onChange={handleChange} />
                    <TextField fullWidth label="Last Name" margin="normal" name="studentLastName" value={studentForm.lastName} onChange={handleChange} />
                    <TextField 
                        fullWidth 
                        label="Age" 
                        margin="normal" 
                        name="studentAge" 
                        type="number" 
                        value={studentForm.age === 0 ? '' : studentForm.age} 
                        onChange={handleChange} 
                    />
                    <TextField fullWidth label="Profession" margin="normal" name="studentProfession" value={studentForm.profession} onChange={handleChange} />
                    <Button variant="contained" onClick={() => handleCreate('student')} sx={{ mt: 2 }}>Create Student</Button>
                </Paper>
                
            </Box>
        </Box>
    );
}