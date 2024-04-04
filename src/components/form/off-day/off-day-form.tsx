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
import { Option } from "@/types/option";
import { OffDayType } from "@/types/off-day";

export interface OffDayFormModel {
  from: string;
  to: string;
  name: string;
  type: OffDayType;
}

const OffDayForm: React.FC<{}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [holidayTypeOptions, setHolidayTypeOptions] = useState<Option[]>([
    {
      id: "holiday",
      name: "Holiday",
    },
    {
      id: "mass_leave",
      name: "Mass Leave",
    },
  ]);

  const [form, setForm] = useState<OffDayFormModel>({
    from: "",
    to: "",
    name: "",
    type: "holiday",
  });

  const [snackbar, setSnackBarModel] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    autoHide: 5,
  });

  const onValidate = (values: OffDayFormModel) => {
    const errors: any = {};

    if (!values.from) {
      errors.from = "This field is required!";
    }
    if (!values.to) {
      errors.to = "This field is required!";
    }
    if (
      moment(values.from, "MM/DD/YYYY").isAfter(moment(values.to, "MM/DD/YYYY"))
    ) {
      errors.from = "From date must be before or same to date!";
    }
    if (
      moment(values.to, "MM/DD/YYYY").isBefore(
        moment(values.from, "MM/DD/YYYY")
      )
    ) {
      errors.to = "To date must be before or same from date!";
    }
    if (!values.name) {
      errors.name = "This field is required!";
    }
    if (!values.type) {
      errors.type = "This field is required!";
    }

    return errors;
  };

  const onSubmit = async (
    values: OffDayFormModel,
    { setSubmitting, resetForm }: FormikHelpers<OffDayFormModel>
  ) => {
    try {
      await axios.post("/api/off-day", {
        from: values.from,
        to: values.to,
        name: values.name,
        type: values.type,
      });

      resetForm();

      setSnackBarModel({
        ...snackbar,
        isOpen: true,
        message: "Successfully add new off day",
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
          <FormTemplate title="Off Day" onSubmit={handleSubmit}>
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
            <FormRow label="from" required>
              <DatePicker
                name="from"
                sx={{ width: "100%" }}
                onChange={(value) => {
                  setFieldValue("from", value, true);
                  setFieldValue("to", "", true);
                }}
                value={moment(values.from)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    error:
                      Boolean(errors.from) &&
                      touched.from &&
                      Boolean(errors.from),
                    helperText: errors.from && touched.from && errors.from,
                  },
                }}
              />
            </FormRow>
            <FormRow label="to" colored required>
              <DatePicker
                name="to"
                sx={{ width: "100%" }}
                onChange={(value) => setFieldValue("to", value, true)}
                value={moment(values.to)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    error:
                      Boolean(errors.to) && touched.to && Boolean(errors.to),
                    helperText: errors.to && touched.to && errors.to,
                  },
                }}
              />
            </FormRow>
            <FormRow label="type" required>
              <TextField
                select
                color="primary"
                sx={{ width: "100%" }}
                name="type"
                onChange={handleChange}
                value={values.type}
                onBlur={handleBlur}
                error={
                  (Boolean(errors.type) &&
                    touched.type &&
                    Boolean(errors.type)) as boolean
                }
                helperText={errors.type && touched.type && errors.type}
              >
                {holidayTypeOptions.map((option) => (
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

export default OffDayForm;
