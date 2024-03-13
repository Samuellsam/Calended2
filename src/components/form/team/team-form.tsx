import { TextField } from "@mui/material";
import FormTemplate from "@/components/template/form-template";
import FormRow from "@/components/template/form-row";
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";

export interface TeamFormModel {
  name: string;
  color: string;
}

const TeamForm: React.FC<{}> = (props) => {
  const [form, setForm] = useState<TeamFormModel>({
    name: "",
    color: "#000000",
  });

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

  const onSubmit = (
    values: TeamFormModel,
    { setSubmitting }: FormikHelpers<TeamFormModel>
  ) => {
    console.log(values);
  };

  return (
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
              sx={{ width: "10%", marginRight: "10px" }}
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
              error={(errors.color && touched.color && errors.color) as boolean}
              helperText={errors.color && touched.color && errors.color}
            />
          </FormRow>
        </FormTemplate>
      )}
    </Formik>
  );
};

export default TeamForm;
