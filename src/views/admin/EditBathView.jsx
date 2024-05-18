import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Stack, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, FormLabel, FormGroup, Checkbox, FormHelperText } from "@mui/material"
import { getBathroom, updateBathroom } from "../../DB";
import { useParams } from "react-router-dom";

const EditBathView = () => {
  const [bath, setBath] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getB = async () => {
      const bath = await getBathroom(id);
      setBath({ id: bath.id, ...bath.data() });
    }
    getB();
  }, [id]);

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
		cost: yup
			.string("Sólo strings")
			.required("Campo requerido"),
		tags: yup
			.array()
			.min(1, "Selecciona al menos una")
			.required("Campo requerido")
	});

  // console.log(bath);

	const formik = useFormik({
		initialValues: {
			name: "",
			address: "",
			lat: "",
			lng: "",
			imgUrl: "",
			cost: "",
			tags: []
		},
		validationSchema: validationSchema,
    onSubmit: values => {
      updateBathroom(bath.id, values);
    }
  });

  useEffect(() => {
    if (bath) {
      formik.setValues({
        name: bath.name,
        address: bath.address,
        lat: bath.lat,
        lng: bath.lng,
        imgUrl: bath.mainPhoto,
        cost: bath.cost,
        tags: bath.tags
      });
    }
    // eslint-disable-next-line
  }, [bath]);

	const tagOptions = [
    { label: "Oxxo", value: "oxxo" },
    { label: "Kiosko", value: "kiosko" },
    { label: "Escuela", value: "escuela" },
    { label: "Hospital", value: "hospital" },
    { label: "Plaza", value: "plaza" },
    { label: "Restaurante", value: "restaurante" },
    { label: "Tienda", value: "tienda" },
    { label: "Gasolinera", value: "gasolinera" },
    { label: "Farmacia", value: "farmacia" },
  ];

  const handleTagChange = (event) => {
    const { value } = event.target;
    const currentIndex = formik.values.tags.indexOf(value);
    const newTags = [...formik.values.tags];

    currentIndex === -1 ? newTags.push(value) : newTags.splice(currentIndex, 1);

    formik.setFieldValue("tags", newTags);
  };

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

        <FormControl error={formik.touched.cost && Boolean(formik.errors.cost)}>
          <InputLabel id="cost-label">Tipo</InputLabel>
          <Select
            labelId="cost-label"
            id="cost"
            name="cost"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Tipo"
          >
            <MenuItem value="público">Público</MenuItem>
            <MenuItem value="privado">Privado</MenuItem>
          </Select>
          <FormHelperText>{formik.touched.cost && formik.errors.cost}</FormHelperText>
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
          <FormHelperText>{formik.touched.tags && formik.errors.tags}</FormHelperText>
        </FormControl>

        <Button color="primary" variant="contained" type="submit">
          Editar baño
        </Button>
      </Stack>
    </form>
  );
};

export default EditBathView;