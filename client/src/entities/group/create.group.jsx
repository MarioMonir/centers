import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateGroup(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="ownerUserId" />

        <NumberInput source="teacherId" />

        <NumberInput source="collectorUserId" />

        <NumberInput source="ownerFees" />
        <BooleanInput source="public" />
      </SimpleForm>
    </Create>
  );
}
