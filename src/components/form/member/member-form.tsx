import { AppDispatch, RootState } from "@/lib/store";
import { Team } from "@/types/team";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "@/lib/features/team/team-slice";
import { blue, blueGrey, grey, red } from "@mui/material/colors";
import FormTemplate from "@/components/template/form-template";
import FormRow from "@/components/template/form-row";
import { Formik, FormikHelpers } from "formik";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";
import axios, { isAxiosError } from "axios";
import { SnackBarModel } from "@/types/snackbar";

export interface MemberFormModel {
  name: string;
  teamId: string;
  birthday: string;
}

const MemberForm: React.FC<{}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const team = useSelector((state: RootState) => state.team.teams);
  const [teamOptions, setTeamOptions] = useState<Team[]>([]);

  const [form, setForm] = useState<MemberFormModel>({
    name: "",
    teamId: "",
    birthday: "",
  });

  const [snackbar, setSnackBarModel] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    autoHide: 5,
  });

  const fetchTeamOptions = async () => {
    dispatch(fetchTeam());
  };

  useEffect(() => {
    setTeamOptions(team);
  }, [team]);

  useEffect(() => {
    fetchTeamOptions();
  }, []);

  const onValidate = (values: MemberFormModel) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "This field is required!";
    }
    if (!values.teamId) {
      errors.teamId = "This field is required!";
    }
    if (!values.birthday) {
      errors.birthday = "This field is required!";
    }

    return errors;
  };

  const onSubmit = async (
    values: MemberFormModel,
    { setSubmitting, resetForm }: FormikHelpers<MemberFormModel>
  ) => {
    try {
      await axios.post("/api/team/member", {
        teamId: values.teamId,
        name: values.name,
        birthday: values.birthday,
      });

      resetForm();

      setSnackBarModel({
        ...snackbar,
        isOpen: true,
        message: "Successfully add new member",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        setSnackBarModel({
          ...snackbar,
          isOpen: true,
          message: error.response?.data.message,
        });
      }
    }
  };

  return (
    <>
      <Formik initialValues={form} validate={onValidate} onSubmit={onSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <FormTemplate title="Member" onSubmit={handleSubmit}>
            <FormRow label="name" colored required>
              <TextField
                name="name"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={(errors.name && touched.name && errors.name) as boolean}
                helperText={errors.name && touched.name && errors.name}
              />
            </FormRow>
            <FormRow label="birthday" required>
              <DatePicker
                name="birthday"
                sx={{ width: "100%" }}
                onChange={(value) => setFieldValue("birthday", value, true)}
                value={moment(values.birthday)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    error:
                      Boolean(errors.birthday) &&
                      touched.birthday &&
                      Boolean(errors.birthday),
                    helperText:
                      errors.birthday && touched.birthday && errors.birthday,
                  },
                }}
              />
            </FormRow>
            <FormRow label="team" colored required>
              <TextField
                select
                color="primary"
                sx={{ width: "100%" }}
                name="teamId"
                onChange={handleChange}
                value={values.teamId}
                onBlur={handleBlur}
                error={
                  (Boolean(errors.teamId) &&
                    touched.teamId &&
                    Boolean(errors.teamId)) as boolean
                }
                helperText={errors.teamId && touched.teamId && errors.teamId}
              >
                {teamOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormRow>
          </FormTemplate>
        )}
      </Formik>
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={snackbar.autoHide}
        message={snackbar.message}
      />
    </>
  );
};

export default MemberForm;
