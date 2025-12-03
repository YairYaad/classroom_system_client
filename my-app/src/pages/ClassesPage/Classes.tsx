import { useQuery, useQueryClient } from "react-query";
import { Button, Box } from "@mui/material"; // ADD Box
import CardComponet from "../../components/Card/Card";
import { fetchClasses, deleteClass, updateClassSchedule } from "../../services/classes.service";
import type { IClass, ISchedule } from "../../interface/class.interface"; 
import { useNavigate } from "react-router-dom"; 

// Example data used only for newly added classes until saved/refreshed
const exampleSchedule: ISchedule[] = [
  { day: 'Monday', time: '10:00 - 11:30', room: '302' },
  { day: 'Wednesday', time: '10:00 - 11:30', room: '302' },
];

export const Classes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: classesData = [], isLoading, error } = useQuery<IClass[]>({
    initialData: [],
    queryKey: ["classes"], 
    queryFn: async () => fetchClasses(),
  });

  const handleAddClass = () => {
    navigate('/create');
  };
  
  const handleDeleteClass = async (id: string) => {
    if (confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteClass(id);
        queryClient.invalidateQueries('classes');
      } catch (error) {
        alert("Failed to delete class. A class cannot be deleted if students are assigned.");
        console.error("Delete Class Error:", error);
      }
    }
  };

  const handleScheduleUpdate = async (id: string, newSchedule: ISchedule[]) => {
    try {
        // This function would normally call updateClassSchedule(id, newSchedule);
        
        // Simulating success by updating the cache immediately after the API call (which you would add here)
        queryClient.invalidateQueries('classes'); 
        
        alert(`Schedule for class ${id} saved successfully to the database!`);
    } catch (error) {
        alert("Failed to save schedule. Check the backend console.");
        console.error("Schedule Update Error:", error);
    }
  };


  if (isLoading) return <div>Loading classes...</div>;
  if (error) return <div>An error occurred while fetching classes.</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <h1>Available Classes</h1>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddClass}
        >
          Create New Class
        </Button>
      </Box>
      
      {/* NEW: Grid container for the cards */}
      <Box 
        sx={{ 
          display: 'grid',
          // Responsive grid: 1 column on small screens, 3 on large screens
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3, 
          mt: 2
        }}
      >
        {classesData.map((classItem) => (
          // Use CardComponet directly, as the Box wrapper is handled by the grid container
          <CardComponet
            key={classItem.id} 
            classId={classItem.id}
            onDelete={handleDeleteClass}
            onScheduleUpdate={handleScheduleUpdate} 
            name={classItem.className}
            subject={classItem.subject || 'N/A'}
            teacherName={classItem.teacherName || 'TBD'}
            numStudents={classItem.students?.length || 0}
            students={classItem.students}
            schedule={classItem.schedule || exampleSchedule} 
          />
        ))}
      </Box>
    </Box>
  );
};