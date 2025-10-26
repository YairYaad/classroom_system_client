import { useQuery } from "react-query";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CardComponet from "../../components/Card/Card";
import { addClass, fetchClasses } from "../../services/classes.service";

export interface IRow {
  name: string;
  proffesion: string;
  age: number;
}

export const Classes = () => {
  const [relevantClasses, setRelevantClasses] = useState([]);

  const { data, isLoading, error } = useQuery({
    initialData: [],
    queryKey: ["uniqueKey"],
    queryFn: async () => fetchClasses(),
  });

  useEffect(() => {
    console.log(data);
    
    setRelevantClasses(data);
  }, [data]);

  const handleAddClass = async () => {
    addClass({
      id: "abb6407e-a601-4be9-9d77-179c071774c5",
      className: "New Class",
      totalPlaces: 15,
    });
  };

  return (
    <div>
      {relevantClasses.map((classItem: any) => (
        <div>
          <CardComponet
            key={classItem.id}
            name={classItem.className}
            numStudents={classItem.totalPlaces}
            students={classItem.students}
          />
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddClass}>
        beni
      </Button>
    </div>
  );
};
