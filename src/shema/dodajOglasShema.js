import * as yup from "yup";

export const dodajOglasShema = yup.object({
    text: yup
      .string()
      .required("text je obavezno polje")
      .min(6, "text mora da ima najmanje 6 karaktera")
      .max(300, "text mora da ima najvise 200 karaktera"),
    naziv: yup
      .string()
      .required("Naziv proizvoda je obavezno polje")
      .min(2, "Naziv proizvoda mora da ima najmanje 2 karaktera")
      .max(50, "Naziv proizvoda mora da ima najvise 50 karaktera"),
    cena: yup.number().required("Cena je obavezno polje"),
    brojTelefona: yup.number(),
    lokacija: yup.string().required("Lokacija je obavezno polje"),
    novo: yup.string(),
  });