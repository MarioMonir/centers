import { Create, NumberInput, SimpleForm } from "react-admin";

// ------------------------------------------------

export default function CreateUser(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />
      </SimpleForm>
    </Create>
  );
}
