import React from "react";
import { useFormik } from "formik";
import * as yup from "yup"; 
import { Stack, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, FormLabel, FormHelperText, RadioGroup, Radio } from "@mui/material";


const AddBath = () => {
  const validationSchema = yup.object({
    name: yup
      .string("Solo strings")
      .required("Campo requerido"),
    address: yup
      .string("Solo strings")
      .required("Campo requerido"),
    lat: yup
      .number("Solo numeros")
      .required("Campo requerido"),
    lng: yup
      .number("Solo numeros")
      .required("Campo requerido"),
    imgUrl: yup
      .string("Solo strings")
      .required("Campo requerido"),
    type: yup
      .string("Solo strings")
      .required("Campo requerido"),
    tags: yup
      .string()
      .required("Selecciona una")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      lat: "",
      lng: "",
      imgUrl: "",
      type: "",
      tags: ""
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 style={{ fontSize: '1.5em', marginBottom: '0.5em' }}>Agregar baño</h1>
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
          {formik.touched.type && formik.errors.type && (
            <div style={{ color: '#d43e48', fontSize: '0.75em', marginTop: '0.25em', marginLeft: '1.3em'}}>
              {formik.errors.type}
            </div>
          )}
        </FormControl>

        <FormControl component="fieldset" error={formik.touched.tags && Boolean(formik.errors.tags)}>
          <FormLabel component="legend">Tags</FormLabel>
          <RadioGroup
            id="tags"
            name="tags"
            value={formik.values.tags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {tagOptions.map((tag) => (
              <FormControlLabel
                key={tag.value}
                value={tag.value}
                control={<Radio />}
                label={tag.label}
              />
            ))}
          </RadioGroup>
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

export default AddBath;