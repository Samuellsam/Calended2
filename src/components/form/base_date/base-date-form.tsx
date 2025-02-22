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

export interface BaseDateFormModel {
  baseDate: string;
  teamId: string;
}

const BaseDateForm: React.FC<{}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const team = useSelector((state: RootState) => state.team.teams);
  const [teamOptions, setTeamOptions] = useState<Team[]>([]);

  const [form, setForm] = useState<BaseDateFormModel>({
    baseDate: "",
    teamId: "",
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

  const onValidate = (values: BaseDateFormModel) => {
    const errors: any = {};

    if (!values.baseDate) {
      errors.baseDate = "This field is required!";
    }
    if (!values.teamId) {
      errors.teamId = "This field is required!";
    }

    return errors;
  };

  const onSubmit = async (
    values: BaseDateFormModel,
    { setSubmitting, resetForm }: FormikHelpers<BaseDateFormModel>
  ) => {
    try {
      await axios.post("/api/base-date", {
        baseDate: values.baseDate,
        teamId: values.teamId,
      });

      resetForm();

      setSnackBarModel({
        ...snackbar,
        isOpen: true,
        message: "Successfully set new base date",
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
          <FormTemplate title="Base Date" onSubmit={handleSubmit}>
            <FormRow label="base date" colored required>
              <DatePicker
                name="baseDate"
                sx={{ width: "100%" }}
                onChange={(value) => setFieldValue("baseDate", value, true)}
                value={moment(values.baseDate)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    error:
                      Boolean(errors.baseDate) &&
                      touched.baseDate &&
                      Boolean(errors.baseDate),
                    helperText:
                      errors.baseDate && touched.baseDate && errors.baseDate,
                  },
                }}
              />
            </FormRow>
            <FormRow label="team" required>
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

export default BaseDateForm;
