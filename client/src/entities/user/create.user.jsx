import { Create, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function CreateUser(props) {
  return (
    <Create {...props} redirect={false}>
      <SimpleForm variant="outlined">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextInput source="name" />
          <TextInput source="email" />
        </div>
        <TextInput source="password" />
        <TextInput source="permission" />
      </SimpleForm>
    </Create>
  );
}
