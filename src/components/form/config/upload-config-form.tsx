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

export interface UploadConfigFormModel {
  configString: string;
}

const UploadConfigForm: React.FC<{}> = (props) => {
  const [form, setForm] = useState<UploadConfigFormModel>({
    configString: "",
  });

  const [snackbar, setSnackBarModel] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    autoHide: 5,
  });

  const onValidate = (values: UploadConfigFormModel) => {
    const errors: any = {};

    if (!values.configString) {
      errors.configString = "This field is required!";
    }

    return errors;
  };

  const onSubmit = async (
    values: UploadConfigFormModel,
    { setSubmitting, resetForm }: FormikHelpers<UploadConfigFormModel>
  ) => {
    try {
      await axios.post("/api/config", {
        config: values.configString,
      });

      setSnackBarModel({
        ...snackbar,
        isOpen: true,
        message: "Successfully set new config",
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
          <FormTemplate title="Config" onSubmit={handleSubmit}>
            <FormRow label="config" colored required>
              <TextField
                multiline
                rows={15}
                color="primary"
                sx={{ width: "100%" }}
                name="configString"
                value={values.configString}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  (Boolean(errors.configString) &&
                    touched.configString &&
                    Boolean(errors.configString)) as boolean
                }
                helperText={
                  errors.configString &&
                  touched.configString &&
                  errors.configString
                }
              ></TextField>
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

export default UploadConfigForm;
