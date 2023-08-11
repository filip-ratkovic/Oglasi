import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup
      .string()
      .required("Email je obavezno polje, unesite email")
      .email("Email format nije dobar"),
    password: yup
      .string()
      .required("Sifra je obavezno polje, unesite sifru")
      .min(6, "Sifra mora da ima najmanje 6 karaktera")
      .max(50, "Sifra mora da ima najvise 50 karaktera"),
  });