import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { IStudent } from "../../interface/student.interface";

interface ClassListOfStudentsProps {
  open: boolean;
  handleClose: () => void;
  students: IStudent[] | undefined;
}

export const ClassListOfStudents = ({
  open,
  handleClose,
  students
}: ClassListOfStudentsProps) => {
  const emails = ["username@gmail.com", "user02@gmail.com"];
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {students?.map((student) => (
          <ListItem disablePadding key={student.id}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary={student.firstName} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton autoFocus>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};
