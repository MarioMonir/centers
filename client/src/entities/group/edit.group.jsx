import React from "react";
import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  Edit,
  FormDataConsumer,
  NumberInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useTranslate,
  regex,
  ReferenceInput,
} from "react-admin";
import levels from "../../utils/levels";

// ------------------------------------------------

const loggedInUser = JSON.parse(localStorage.getItem("user"));
const Levels = JSON.parse(localStorage.getItem("levels")) || levels;

// ------------------------------------------------

export default function CreateGroup() {
  const translate = useTranslate();
  return (
    <Edit redirect="show">
      <SimpleForm>
        {loggedInUser.userType !== "Teacher" && (
          <ReferenceInput source="teacherUserId" reference="user">
            <AutocompleteInput
              label={translate("resources.group.labels.teacher")}
              sx={{ minWidth: 235 }}
              variant="outlined"
              optionText="name"
            />
          </ReferenceInput>
        )}
        <TextInput source="courseName" variant="outlined" />

        <AutocompleteInput
          sx={{ minWidth: 235 }}
          variant="outlined"
          source="level"
          choices={Levels}
          optionText="name"
          optionValue="id"
          createLabel="asd"
          onCreate={(value) => {
            const newLevel = {
              id: value,
              name: value,
            };
            Levels.push(newLevel);
            localStorage.setItem("levels", JSON.stringify(Levels));
            return newLevel;
          }}
        />
        <SelectInput
          sx={{ minWidth: 235 }}
          choices={[
            { id: "InPerson", name: "resources.group.groupType.InPerson" },
            { id: "Online", name: "resources.group.groupType.Online" },
            { id: "Hypred", name: "resources.group.groupType.Hypred" },
          ]}
          variant="outlined"
          source="groupType"
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            (formData.groupType === "InPerson" ||
              formData.groupType === "Hypred") &&
            loggedInUser.userType === "Teacher" && (
              <TextInput variant="outlined" source="location" />
            )
          }
        </FormDataConsumer>

        <SelectInput
          sx={{ minWidth: 235 }}
          choices={[
            { id: "Lecture", name: "resources.group.paymentType.Lecture" },
            { id: "Month", name: "resources.group.paymentType.Month" },
            {
              id: "Installment",
              name: "resources.group.paymentType.Installment",
            },
          ]}
          variant="outlined"
          source="paymentType"
        />

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.paymentType && (
              <NumberInput
                variant="outlined"
                source="paymentCost"
                label={translate(
                  "resources.group.paymentCostlabel." + formData.paymentType
                )}
              />
            )
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.paymentType &&
            loggedInUser.userType === "Center" && (
              <NumberInput
                variant="outlined"
                source="centerCostPerLecture"
                label={translate("resources.group.fields.centerCostPerLecture")}
              />
            )
          }
        </FormDataConsumer>

        <BooleanInput variant="outlined" source="public" />

        <ArrayInput source="dates">
          <SimpleFormIterator>
            <SelectInput
              sx={{ minWidth: 235 }}
              label={translate("resources.group.labels.day")}
              source="day"
              choices={[
                { id: "sat", name: "weekDays.sat" },
                { id: "sun", name: "weekDays.sun" },
                { id: "mon", name: "weekDays.mon" },
                { id: "tue", name: "weekDays.tue" },
                { id: "wed", name: "weekDays.wed" },
                { id: "thu", name: "weekDays.thu" },
                { id: "fri", name: "weekDays.fri" },
              ]}
              variant="outlined"
            />
            <TextInput
              label={translate("resources.group.labels.from")}
              source="from"
              placeholder="i.e. 10:30 am"
              variant="outlined"
              validate={regex(
                /^(0?[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/,
                translate("other.invalid") + "  hh:mm am"
              )}
            />
            <TextInput
              label={translate("resources.group.labels.to")}
              source="to"
              placeholder="i.e. 12:30 am"
              variant="outlined"
              validate={regex(
                /^(0?[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/,
                translate("other.invalid") + "  hh:mm am"
              )}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}
