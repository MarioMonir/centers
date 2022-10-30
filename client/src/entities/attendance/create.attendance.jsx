import {
  BooleanInput,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  ResourceContextProvider,
} from "react-admin";
import config from "../../configs/config";
import React, { useState, useEffect } from "react";
import Protected from "../../reactAdmin/components/Protected";
import axios from "axios";

// ------------------------------------------------

export default function CreateAttendance(props) {
  const [loggedUser, setLoggedUser] = useState([]);
  const [GroupId, setGroupId] = useState(null);
  const [formData, setFormData] = useState({
    studentId: null,
    homework: false,
    homeworkNotes: "",
  });
  const id = JSON.parse(localStorage.getItem("groupId"));
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
    setGroupId(id);
  }, []);
  const handleSubmit = (e) => {
    console.log(formData);
    fetch(`${config.baseUrl}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        studentId: formData.studentId,
        homework: formData.homework,
        homeworkNotes: formData.homeworkNotes,
        groupId: 1,
      }),
    });
  };
  return (
    <Protected loggedUser={loggedUser}>
      <SimpleForm redirect="list" onSubmit={handleSubmit}>
        <NumberInput
          source="studentId"
          label="Student Code"
          variant="outlined"
          min={1}
          onChange={(e) => {
            setFormData({ ...formData, studentId: e.target.value });
          }}
        />
        <BooleanInput
          source="homework"
          onChange={(e) => {
            setFormData({ ...formData, homework: true });
          }}
        />
        <TextInput
          source="notes"
          variant="outlined"
          onChange={(e) => {
            setFormData({ ...formData, homeworkNotes: e.target.value });
          }}
        />
      </SimpleForm>
    </Protected>
  );
}
