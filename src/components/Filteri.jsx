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
import { allCategories } from "../shema/allCategories";
import "./filteri.css"

function Filteri({ getFilters }) {
  const [categoryName, setCategoryName] = useState(allCategories[0]);
  const [maxPrice, setMaxPrice] = useState(-Infinity)
  const [lowestPrice, setLowestPrice] = useState(Infinity)
  const [value1, setValue1] = useState([-Infinity, Infinity]);
  const [data, setData] = useState({
    stanje:"sve",
    cena:value1,
    kategorija:categoryName
  });


  const minDistance = 10;
  const theme = useTheme();

  function valuetext(value) {
    return `${value}$`;
  }

  const sviOglasi = JSON.parse(localStorage.getItem("sviOglasi"))

  const handlePrice = () => {
    let newLowestPrice = Infinity;
    let newMaxPrice = -Infinity;
  
    sviOglasi.forEach((oglas) => {
      const cena = Number(oglas.cena);
  
     if(oglas.valuta === "din") {
        if (cena < newLowestPrice) {
            newLowestPrice = cena;
          }
          if (cena > newMaxPrice) {
            newMaxPrice = cena;
          }
     }
      else if (oglas.valuta === "eur") {
        if ((cena*118) < newLowestPrice) {
            newLowestPrice = (cena*118);
          }
          if ((cena*118) > newMaxPrice) {
            newMaxPrice = (cena*118);
          }
     }
    });
    setLowestPrice(newLowestPrice);
    setMaxPrice(newMaxPrice);
    setValue1([newLowestPrice, newMaxPrice])
  };
  

  useEffect(()=> {
    handlePrice()
  },[])

  const handleChange1 = (event, newValue, activeThumb) => {
    getFilters({ ...data, cena:newValue});
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
    getFilters({ ...data, [inputID]: value, kategorija: categoryName});
  };


  const clearFilters =()=> {
    getFilters({kategorija:"Sve", stanje:"sve", cena:[-Infinity,Infinity]})
    setData({kategorija:"Sve", stanje:"sve", cena:[-Infinity,Infinity]})
  }


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
        defaultValue="sve"
        value={data.stanje}
        name="stanje"
        id="stanje"
        onChange={handleInput}
        style={{ width: "45%" }}
      >
        <MenuItem value={"polovno"} selected>
          Polovno
        </MenuItem>
        <MenuItem value={"novo"}>Novo</MenuItem>
        <MenuItem value={"sve"}>Sve</MenuItem>
      </TextField>
      <p><span>{value1[0]}</span>           <span>{value1[1]}</span></p>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={maxPrice}
        min={lowestPrice}
        disableSwap
      />
      <Button onClick={clearFilters}>Ocisti filtere</Button>
    </Box>
  );
}

export default Filteri;
