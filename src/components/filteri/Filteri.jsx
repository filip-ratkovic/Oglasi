import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { allCategories } from "../../shema/allCategories";
import "./filteri.css";

function Filteri({ getFilters}) {
  const [categoryName, setCategoryName] = useState(allCategories[0]);
  const [maxPrice, setMaxPrice] = useState(-Infinity);
  const [lowestPrice, setLowestPrice] = useState(Infinity);
  const [value1, setValue1] = useState([-Infinity, Infinity]);
  const [data, setData] = useState({
    stanje: "sve",
    cena: value1,
    kategorija: categoryName,
  });

  const minDistance = 10;
  const theme = useTheme();

  function valuetext(value) {
    return `${value}`;
  }

  const sviOglasi = JSON.parse(localStorage.getItem("sviOglasi"));

  const handlePrice = () => {
    let newLowestPrice = Infinity;
    let newMaxPrice = -Infinity;

    sviOglasi?.forEach((oglas) => {
      const cena = Number(oglas.cena);

      if (oglas.valuta === "din") {
        if (cena < newLowestPrice) {
          newLowestPrice = cena;
        }
        if (cena > newMaxPrice) {
          newMaxPrice = cena;
        }
      } else if (oglas.valuta === "eur") {
        if (cena * 118 < newLowestPrice) {
          newLowestPrice = cena * 118;
        }
        if (cena * 118 > newMaxPrice) {
          newMaxPrice = cena * 118;
        }
      }
    });
    setLowestPrice(newLowestPrice);
    setMaxPrice(newMaxPrice);
    setValue1([newLowestPrice, newMaxPrice]);
  };

  useEffect(() => {
    handlePrice();
  }, []);

  const handleChange1 = (event, newValue, activeThumb) => {
    getFilters({ ...data, cena: newValue });
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const handleCategory = (e) => {
    setCategoryName(e.target.value);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    const inputID = e.target.name;
    setData({ ...data, [inputID]: value, kategorija: categoryName });
    getFilters({ ...data, [inputID]: value, kategorija: categoryName });
  };

  const clearFilters = () => {
    setData({ kategorija: "Sve", stanje: "sve", cena: [-Infinity, Infinity] });
    getFilters({
      kategorija: "Sve",
      stanje: "sve",
      cena: [-Infinity, Infinity],
    });
    handlePrice();
  };

  useEffect(() => {
    getFilters({ ...data, kategorija: categoryName });
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
  return (
    <Box className="pocetna-filteri">
      <Box className="pocetna-filteri-kategorija">

      <FormControl sx={{ width: "100%", m: "30px 0" }}>
        <InputLabel id="demo-multiple-name-label">Kategorija</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="kategorija"
          value={categoryName}
          onChange={handleCategory}
          input={<OutlinedInput label="Kategorija" />}
          MenuProps={MenuProps}
          style={{backgroundColor:theme.palette.primary.main}}
        >
          {allCategories.map((name) => (
            <MenuItem
              key={name}
              value={name}
              id={name}
              className="category-dropdown"
              style={{backgroundColor:theme.palette.primary.main}}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        select
        label="Stanje"
        defaultValue="sve"
        value={data.stanje}
        name="stanje"
        id="stanje"
        onChange={handleInput}
        
        style={{ width: "100%", zIndex:"12",backgroundColor:theme.palette.primary.main }}
      >
        <MenuItem value={"polovno"} style={{zIndex:"11",  backgroundColor:theme.palette.primary.main}} selected>
          Polovno
        </MenuItem>
        <MenuItem value={"novo"}  style={{zIndex:"11",  backgroundColor:theme.palette.primary.main}}>Novo</MenuItem>
        <MenuItem value={"sve"}  style={{zIndex:"11",  backgroundColor:theme.palette.primary.main}}>Sve</MenuItem>
      </TextField>
      </Box>
      <Box id="price-container" style={{ marginTop: "30px" }}>
        <p
          className="price-box"
          style={{
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background,
          }}
        >
          {value1[0]} RSD
        </p>
        <p
          className="price-box"
          style={{
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background,
          }}
        >
          {value1[1]} RSD
        </p>
      </Box>
      <Box style={{ paddingInline: "10px" }}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={maxPrice}
          min={lowestPrice}
          disableSwap
          className="filteri-display"
          style={{color:theme.palette.secondary.main}}
        />
      </Box>
      <Box className="filteri-display">
      <Button
        variant="outlined"
        onClick={clearFilters}
        style={{backgroundColor:theme.palette.text.primary, color:theme.palette.background}}
      >
        Ponisti sve
      </Button>
      </Box>
    </Box>
  );
}

export default Filteri;