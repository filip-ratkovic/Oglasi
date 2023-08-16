import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { allCategories } from "../shema/allCategories";

function Filteri({getFilters}) {
    const [categoryName, setCategoryName] = useState(allCategories[0]);
    const [data, setData] =useState()
    const theme = useTheme()

    const handleCategory = (e) => {
        setCategoryName(e.target.value);
        setData({ ...data, kategorija: categoryName });
      };


    const handleInput = (e)=> {
        const value = e.target.value;
        const inputID = e.target.name;
        setData({ ...data, [inputID]: value, kategorija: categoryName });
        getFilters({ ...data, [inputID]: value, kategorija: categoryName });
    }

      useEffect( () => {
        getFilters({...data, kategorija:categoryName})
      }, [categoryName]);

      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 200,
            width: 250,
            zIndex: "1",
            backgroundColor: theme.palette.background,
          },
        },
      };
    
  return <Box className="pocetna-filteri">
    <FormControl sx={{ width: "100%", mt: "30px" }}>
              <InputLabel id="demo-multiple-name-label">Kategorija</InputLabel>
              <Select

                labelId="demo-multiple-name-label"
                id="kategorija"
                value={categoryName}
                onChange={handleCategory}
                input={<OutlinedInput label="Kategorija" />}
                MenuProps={MenuProps}
              >
                {allCategories.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    id={name}
                    className="category-dropdown"
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              select
              label="Stanje"
              defaultValue="polovno"
              name="stanje"
              id="stanje"
              onChange={handleInput}
              style={{ width: "45%" }}
            >
              <MenuItem value={"polovno"} selected>
                Polovno
              </MenuItem>
              <MenuItem value={"novo"}>Novo</MenuItem>
            </TextField>
  </Box>;
}

export default Filteri;
