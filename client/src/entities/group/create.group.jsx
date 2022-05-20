import {
  BooleanInput,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  AutocompleteInput,
} from "react-admin";
import courses from "../../utils/courses";

// ------------------------------------------------

export default function CreateGroup(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        {/* <TextInput source="name" /> */}
        <AutocompleteInput
          source="name"
          choices={courses}
          optionText="en"
          optionValue="id"
          createLabel="asd"
          onCreate={(value) => {

            //const newCourseName = prompt("Enter a new Course");
            const newCourse = {
              id: value.toLowerCase(),
              en: value,
            };
             courses.push(newCourse);
             return newCourse;
          }}
        />
        <TextInput source="level" />
        <TextInput source="groupType" />

        <NumberInput source="ownerUserId" />

        <NumberInput source="teacherId" />

        <NumberInput source="collectorUserId" />

        <NumberInput source="ownerFees" />
        <BooleanInput source="public" />
        <TextInput source="dates" />
      </SimpleForm>
    </Create>
  );
}
