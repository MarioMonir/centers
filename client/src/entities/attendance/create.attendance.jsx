import {
  BooleanInput,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  ResourceContextProvider,
} from "react-admin";

// ------------------------------------------------

export default function CreateAttendance({ groupId }) {
  return (
    <ResourceContextProvider value="attendance">
      <Create transform={(data) => ({ ...data, groupId })}>
        <SimpleForm redirect="list">
          <NumberInput
            source="studentId"
            label="Student Code"
            variant="outlined"
          />
          <BooleanInput source="homework" />
          <TextInput source="notes" variant="outlined" />
        </SimpleForm>
      </Create>
    </ResourceContextProvider>
  );
}
