import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { FunctionField, ReferenceField, useUpdate } from "react-admin";
import { dateHandling } from "../../../utils/dataHandling";
import { useRefresh, useTranslate } from "react-admin";

const user = JSON.parse(localStorage.getItem("user"));

// =================================================================

export default function RequestCard({ record }) {
  const [payment, setPayment] = useState();
  const refresh = useRefresh();
  const [update, { isLoading, error }] = useUpdate();

  // ------------------------------------------------

  const handlePaymentChange = (e) => {
    setPayment(parseFloat(e?.target?.value));
  };

  // ------------------------------------------------

  const submitAccept = () => {
    update("request", {
      id: record.id,
      data: { requestStatus: "Accpeted", payment, toUserId: user?.id },
    });
    // shit because of shit
    // window.location.reload();
  };

  // ------------------------------------------------

  const submitRefuse = async () => {
    await update("request", {
      id: record.id,
      data: { requestStatus: "Refused" },
    });
    // shit because of shit
    // window.location.reload();
  };

  // ------------------------------------------------
  const translate = useTranslate();
  return (
    <Card sx={{ padding: 2 }}>
      {/* <CardActionArea
        href={"#/request/" + record.id + "/show"}
        sx={{ padding: 2 }}
      > */}
      <div style={{ display: "flex" }}>
        {/*  ===========================================================  */}
        <AccountCircleIcon color="action" sx={{ fontSize: 45 }} />
        <div
          style={{
            paddingTop: 2,
            paddingLeft: 5,
            marginRight: "auto",
          }}
        >
          <ReferenceField
            record={record}
            reference="user"
            source="fromUserId"
            link={false} //"show"
          >
            <FunctionField
              render={(record) => `${record?.userType}, ${record?.name}`}
            />
          </ReferenceField>
          <Typography variant="body2" sx={{ color: "#787878" }}>
            {translate("resources.request.name")}{" "}
            {dateHandling(record?.createdAt || new Date())}{" "}
            {translate("resources.request.fields.ago")}
          </Typography>
        </div>

        {/*  ===========================================================  */}

        <div style={{ margin: "auto" }}>
          <Typography variant="body1">
            {translate("resources.request.fields.studentId")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre" }}>
            {record?.fromUserId}
          </Typography>
        </div>

        {/*  ===========================================================  */}

        <div style={{ margin: "auto" }}>
          <Typography variant="body1">
            {" "}
            {translate("resources.request.fields.course")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre" }}>
            <ReferenceField
              record={record}
              reference="group"
              source="toGroupId"
              link={false} //"show"
            >
              <FunctionField
                render={(record) => `${record?.courseName} - ${record?.level}`}
              />
            </ReferenceField>
          </Typography>
        </div>

        {/*  ===========================================================  */}

        <div style={{ margin: "auto" }}>
          <Typography variant="body1">
            {" "}
            {translate("resources.request.fields.teacher")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre" }}>
            <ReferenceField
              record={record}
              reference="group"
              source="toGroupId"
              link={false} //"show"
            >
              <ReferenceField
                // record={record}
                reference="user"
                source="teacherUserId"
                link={false} //"show"
              >
                <FunctionField render={(record) => `${record?.name}`} />
              </ReferenceField>
            </ReferenceField>
          </Typography>
        </div>

        {/*  ===========================================================  */}

        <div style={{ margin: "auto" }}>
          <Typography variant="body1">
            {" "}
            {translate("resources.request.fields.status")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color:
                record?.requestStatus == "Pending"
                  ? "#f5bf42"
                  : record?.requestStatus == "Accpeted"
                  ? "#43a047"
                  : "#e53935",
            }}
          >
            {record?.requestStatus}
          </Typography>
        </div>

        {/*  ===========================================================  */}

        <div style={{ marginLeft: "auto" }}>
          <TextField
            sx={{ marginTop: 0.75, width: 150, marginRight: 2 }}
            size="small"
            label={translate("resources.request.fields.payment")}
            type="number"
            variant="outlined"
            name="payment"
            value={payment}
            onChange={handlePaymentChange}
            disabled={record?.requestStatus !== "Pending"}
          />
          <IconButton
            aria-label="accept"
            size="large"
            disabled={record?.requestStatus !== "Pending"}
            onClick={submitAccept}
            sx={{ color: "#43a047" }}
          >
            <CheckCircleOutlineIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="refuse"
            size="large"
            sx={{ color: "#e53935" }}
            disabled={record?.requestStatus !== "Pending"}
            onClick={submitRefuse}
          >
            <HighlightOffIcon fontSize="inherit" />
          </IconButton>
        </div>

        {/*  ===========================================================  */}
      </div>
      {/* </CardActionArea> */}
    </Card>
  );
}
