import { Box, Drawer, Grid, Snackbar, TextField } from "@mui/material";
import FormTemplate from "@/components/template/form-template";
import FormRow from "@/components/template/form-row";
import { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import TeamController from "@/controllers/TeamController";
import axios, { isAxiosError } from "axios";
import { SnackBarModel } from "@/types/snackbar";
import TeamListItem from "@/components/team/team-list-item";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchTeam } from "@/lib/features/team/team-slice";
import { blueGrey } from "@mui/material/colors";

export interface TeamFormModel {
  name: string;
  color: string;
}

const TeamForm: React.FC<{}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const team = useSelector((state: RootState) => state.team.teams);

  const [formDrawer, setFormDrawer] = useState<boolean>(false);
  const [form, setForm] = useState<TeamFormModel>({
    name: "",
    color: "#000000",
  });
  const [snackbar, setSnackBarModel] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    autoHide: 5,
  });

  useEffect(() => {
    dispatch(fetchTeam());
  }, []);

  const onValidate = (values: TeamFormModel) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "This field is required!";
    }
    if (!values.color) {
      errors.color = "This field is required!";
    }

    return errors;
  };

  const onSubmit = async (
    values: TeamFormModel,
    { setSubmitting, resetForm }: FormikHelpers<TeamFormModel>
  ) => {
    try {
      await axios.post("/api/team", {
        name: values.name,
        color: values.color,
      });

      resetForm();

      setSnackBarModel({
        ...snackbar,
        isOpen: true,
        message: "Successfully add new team",
      });

      dispatch(fetchTeam());
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
        }) => (
          <FormTemplate title="Team" onSubmit={handleSubmit}>
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
            <FormRow label="color" required>
              <TextField
                name="color"
                variant="outlined"
                sx={{ width: "30%", marginRight: "10px" }}
                type="color"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.color}
              />
              <TextField
                name="color"
                variant="outlined"
                sx={{ width: "100%" }}
                value={values.color}
                disabled
                error={
                  (errors.color && touched.color && errors.color) as boolean
                }
                helperText={errors.color && touched.color && errors.color}
              />
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

export default TeamForm;
