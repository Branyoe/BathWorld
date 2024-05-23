import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "../index.css";

const tagOptions = [
  { label: "Oxxo", value: "oxxo" },
  { label: "Escuela", value: "escuela" },
  { label: "Hospital", value: "hospital" },
  { label: "Plaza", value: "plaza" },
  { label: "Restaurante", value: "restaurante" },
  { label: "Tienda", value: "tienda" },
  { label: "Gasolinera", value: "gasolinera" }
];

const CategoryFilter = ({ category, onChange }) => {
    return (
        <FormControl className="filter" variant="outlined">
            <InputLabel>Categoría</InputLabel>
            <Select
                value={category}
                onChange={onChange}
                label="Categoría"
            >
                <MenuItem value="">
                    <em>Ninguna</em>
                </MenuItem>
                {tagOptions.map((tag) => (
                    <MenuItem key={tag.value} value={tag.value}>
                        {tag.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CategoryFilter;