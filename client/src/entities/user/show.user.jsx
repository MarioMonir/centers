import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";

// ------------------------------------------------

export default function ShowUser(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="name" />

        <TextField source="email" />
        <TextField source="password" />
        <TextField source="permission" />
      </SimpleShowLayout>
    </Show>
  );
}
