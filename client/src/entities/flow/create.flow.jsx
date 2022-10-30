import React, { useState, useEffect } from "react";
import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";
import Protected from "../../reactAdmin/components/Protected";

// ------------------------------------------------

export default function CreateFlow(props) {
  console.log(props);
  const [loggedUser, setLoggedUser] = useState([]);
  const [GroupId, setGroupId] = useState(null);
  const id = JSON.parse(localStorage.getItem("groupId"));
  const user = JSON.parse(localStorage.getItem("user"));

  // - - - - - - - - - - - -

  useEffect(() => {
    setLoggedUser(user);
    setGroupId(id);
  }, []);
  console.log(loggedUser.id);
  // - - - - - - - - - - - -

  return (
    <Protected loggedUser={loggedUser}>
      <Create {...props}>
        <SimpleForm variant="outlined" redirect="list">
          {/* <NumberInput initialValue={0} min={0} source="id" /> */}
          <NumberInput source="groupId" />

          <NumberInput min={1} source="fromUserId" />

          <NumberInput source="toUserId" />
          <NumberInput source="balance" />
          <TextInput source="notes" />
        </SimpleForm>
      </Create>
    </Protected>
  );
}
