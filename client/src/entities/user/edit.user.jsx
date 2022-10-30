import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  SelectInput,
} from "react-admin";

// ------------------------------------------------

export default function EditUser(props) {
  return (
    <Edit {...props} transform={(data) => ({ ...data, info: {} })}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="email" />
        <SelectInput
          variant="outlined"
          source="userType"
          sx={{ minWidth: 235 }}
          choices={[
            { id: "Student", name: "Student" },
            { id: "Teacher", name: "Teacher" },
            { id: "TeacherAssistant", name: "TeacherAssistant" },
            { id: "Center", name: "Center" },
            { id: "CenterEmployee", name: "CenterEmployee" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
}
