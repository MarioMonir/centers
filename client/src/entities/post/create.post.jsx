import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

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
