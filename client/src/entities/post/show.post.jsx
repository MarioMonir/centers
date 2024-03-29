import { NumberField, Show, SimpleShowLayout, TextField } from "react-admin";

// ------------------------------------------------

export default function ShowPost(props) {
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
