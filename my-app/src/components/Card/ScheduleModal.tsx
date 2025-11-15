import { Dialog, DialogTitle, DialogContent, Typography, List, ListItem, ListItemText, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { ISchedule } from "../../interface/class.interface";
import { useState, useEffect } from "react"; // ADDED useEffect

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  className: string;
  schedule: ISchedule[];
  classId: string;
  onSave: (classId: string, newSchedule: ISchedule[]) => void; // New save handler
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ open, onClose, className, schedule, classId, onSave }) => {
  const [editingSchedule, setEditingSchedule] = useState<ISchedule[]>(schedule);

  // Sync internal state when the modal opens/schedule data changes
  useEffect(() => {
    setEditingSchedule(schedule);
  }, [schedule]);

  const handleChange = (index: number, field: keyof ISchedule, value: string) => {
    const newSchedule = [...editingSchedule];
    newSchedule[index] = {
      ...newSchedule[index],
      [field]: value,
    };
    setEditingSchedule(newSchedule);
  };

  const handleAddRow = () => {
    setEditingSchedule([...editingSchedule, { day: '', time: '', room: '' }]);
  };

  const handleRemoveRow = (index: number) => {
    const newSchedule = editingSchedule.filter((_, i) => i !== index);
    setEditingSchedule(newSchedule);
  };
  
  const handleSave = () => {
    onSave(classId, editingSchedule); // Call the update handler
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Schedule for {className}</DialogTitle>
      <DialogContent dividers>
        <List>
          {editingSchedule.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center', borderBottom: '1px solid #eee', pb: 1 }}>
              <TextField 
                label="Day" 
                value={item.day} 
                onChange={(e) => handleChange(index, 'day', e.target.value)} 
                size="small"
                sx={{ flex: 1.5 }}
              />
              <TextField 
                label="Time (e.g., 10:00-11:00)" 
                value={item.time} 
                onChange={(e) => handleChange(index, 'time', e.target.value)} 
                size="small"
                sx={{ flex: 2 }}
              />
              <TextField 
                label="Room" 
                value={item.room} 
                onChange={(e) => handleChange(index, 'room', e.target.value)} 
                size="small"
                sx={{ flex: 1 }}
              />
              <IconButton onClick={() => handleRemoveRow(index)} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </List>
        <Button startIcon={<AddIcon />} onClick={handleAddRow} sx={{ mt: 1}}>
          Add Schedule Time
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};