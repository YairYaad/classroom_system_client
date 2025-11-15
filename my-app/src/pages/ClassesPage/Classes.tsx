import { useQuery, useQueryClient } from "react-query";
import { Button } from "@mui/material";
import CardComponet from "../../components/Card/Card";
import { addClass, fetchClasses, deleteClass, updateClassSchedule } from "../../services/classes.service"; // ADD updateClassSchedule
import type { IClass, ISchedule } from "../../interface/class.interface"; 

// Example data used only for newly added classes until saved/refreshed
const exampleSchedule: ISchedule[] = [
  { day: 'Monday', time: '10:00 - 11:30', room: '302' },
  { day: 'Wednesday', time: '10:00 - 11:30', room: '302' },
];

export const Classes = () => {
  const queryClient = useQueryClient();

  const { data: classesData = [], isLoading, error } = useQuery<IClass[]>({
    initialData: [],
    queryKey: ["classes"], 
    queryFn: async () => fetchClasses(),
  });

  const handleAddClass = async () => {
    try {
      await addClass({
        className: "New Auto-Refreshed Class",
        totalPlaces: 20,
        subject: "New Subject",
        teacherName: "New Teacher",
      });
      
      queryClient.invalidateQueries('classes');
      
    } catch (err) {
      console.error("Failed to add class:", err);
      alert("Failed to add class. Check console for details.");
    }
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

  // NEW: Handler to update schedule data remotely
  const handleScheduleUpdate = async (id: string, newSchedule: ISchedule[]) => {
    try {
        // 1. Call the new backend service to persist the data
        await updateClassSchedule(id, newSchedule);
        
        // 2. Invalidate query to force refresh from the database
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
    <div>
      <h1>Available Classes</h1>
      {classesData.map((classItem) => (
        <div key={classItem.id} style={{ marginBottom: '16px' }}>
          <CardComponet
            classId={classItem.id}
            onDelete={handleDeleteClass}
            
            onScheduleUpdate={handleScheduleUpdate} 
            
            name={classItem.className}
            subject={classItem.subject || 'N/A'}
            teacherName={classItem.teacherName || 'TBD'}
            numStudents={classItem.students?.length || 0}
            students={classItem.students}
            schedule={classItem.schedule || exampleSchedule} // Use fetched schedule or fallback
          />
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddClass}>
        Add New Class
      </Button>
    </div>
  );
};