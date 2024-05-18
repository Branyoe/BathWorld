import React from "react";
import { useFormik } from "formik";
import * as yup from "yup"; 
import { Stack, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, FormLabel, FormGroup, Checkbox, FormHelperText } from "@mui/material";

const AddBathView = () => {
  const validationSchema = yup.object({
    name: yup
      .string("Sólo strings")
      .required("Campo requerido"),
    address: yup
      .string("Sólo strings")
      .required("Campo requerido"),
    lat: yup
      .number("Sólo números")
      .required("Campo requerido"),
    lng: yup
      .number("Sólo números")
      .required("Campo requerido"),
    imgUrl: yup
      .string("Sólo strings")
      .required("Campo requerido"),
    type: yup
      .string("Sólo strings")
      .required("Campo requerido"),
    tags: yup
      .array()
      .min(1, "Selecciona al menos una")
      .required("Campo requerido")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      lat: "",
      lng: "",
      imgUrl: "",
      type: "",
      tags: []
    },
    validationSchema: validationSchema,
    onSubmit: values => console.log(values)
  });

  const tagOptions = [
    { label: "Oxxo", value: "oxxo" },
    { label: "Escuela", value: "escuela" },
    { label: "Hospital", value: "hospital" },
    { label: "Plaza", value: "plaza" },
    { label: "Restaurante", value: "restaurante" },
    { label: "Tienda", value: "tienda" },
    { label: "Gasolinera", value: "gasolinera" }
  ];

  const handleTagChange = (event) => {
    const { value } = event.target;
    const currentIndex = formik.values.tags.indexOf(value);
    const newTags = [...formik.values.tags];

    currentIndex === -1 ? newTags.push(value) : newTags.splice(currentIndex, 1);

    formik.setFieldValue("tags", newTags);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          id="name"
          name="name"
          label="Nombre del baño"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          id="address"
          name="address"
          label="Dirección"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <TextField
          id="lat"
          name="lat"
          label="Latitud"
          type="number"
          value={formik.values.lat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lat && Boolean(formik.errors.lat)}
          helperText={formik.touched.lat && formik.errors.lat}
        />

        <TextField
          id="lng"
          name="lng"
          label="Longitud"
          type="number"
          value={formik.values.lng}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lng && Boolean(formik.errors.lng)}
          helperText={formik.touched.lng && formik.errors.lng}
        />
        
        <TextField
          id="imgUrl"
          name="imgUrl"
          label="Imagen URL"
          value={formik.values.imgUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.imgUrl && Boolean(formik.errors.imgUrl)}
          helperText={formik.touched.imgUrl && formik.errors.imgUrl}
        />

        <FormControl error={formik.touched.type && Boolean(formik.errors.type)}>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Tipo"
          >
            <MenuItem value="public">Público</MenuItem>
            <MenuItem value="private">Privado</MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.type && formik.errors.type}
          </FormHelperText>
        </FormControl>

        <FormControl component="fieldset" error={formik.touched.tags && Boolean(formik.errors.tags)}>
          <FormLabel component="legend">Tags</FormLabel>
          <FormGroup>
            {tagOptions.map((tag) => (
              <FormControlLabel
                key={tag.value}
                control={
                  <Checkbox
                    checked={formik.values.tags.includes(tag.value)}
                    onChange={handleTagChange}
                    name="tags"
                    value={tag.value}
                  />
                }
                label={tag.label}
              />
            ))}
          </FormGroup>
          <FormHelperText>
            {formik.touched.tags && formik.errors.tags}
          </FormHelperText>
        </FormControl>

        <Button color="primary" variant="contained" type="submit">
          Agregar baño
        </Button>
      </Stack>
    </form>
  );
}

export default AddBathView;