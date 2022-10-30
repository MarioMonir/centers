import { Create, NumberInput, SimpleForm } from "react-admin";

// ------------------------------------------------

export default function CreateEnrolment(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="groupId" min={1} />
        <NumberInput source="studentId" min={1} />
      </SimpleForm>
    </Create>
  );
}
