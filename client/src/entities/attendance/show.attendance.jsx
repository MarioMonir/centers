import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";

// ------------------------------------------------

export default function ShowAttendance(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />

        <NumberField source="groupId" />

        <NumberField source="studentId" />
        <TextField source="notes" />
      </SimpleShowLayout>
    </Show>
  );
}
