import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { IStudent } from "../../interface/student.interface";
import { ClassListOfStudents } from "../ClassListOfStudents/ClassListOfStudents";
import { useState } from "react";
import useStyles from "./Card.styles";
import { data } from "react-router-dom";

interface CardProps {
  name: string;
  numStudents: number;
  students: IStudent[] | undefined;
}

const CardComponet: React.FC<CardProps> = ({ name, numStudents, students }) => {
  const [open, setOpen] = useState(false);
  const styles = useStyles()
  

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of Students: {numStudents}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDialogOpen}>click</Button>
        <Button size="small" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>

      <ClassListOfStudents open={open} handleClose={handleDialogOpen} students={students}/>
    </Card>
  );
};

export default CardComponet;
