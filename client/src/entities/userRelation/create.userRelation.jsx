import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateUserRelation(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="followerId" />

        <NumberInput source="followingId" />
      </SimpleForm>
    </Create>
  );
}
