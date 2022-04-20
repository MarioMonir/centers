import { Edit, NumberInput, SimpleForm } from "react-admin";

// ------------------------------------------------

export default function EditPost(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />
      </SimpleForm>
    </Edit>
  );
}
