import * as Yup from "yup";


export const RegistracijaShema = Yup.object({
    email: Yup.string()
      .required("Email je obavezno polje, unesite email")
      .email("Email format nije dobar"),
    password: Yup.string()
      .required("Sifra je obavezno polje, unesite sifru")
      .min(6, "Sifra mora da ima najmanje 6 karaktera")
      .max(50, "Sifra mora da ima najvise 50 karaktera"),
    confirm_password: Yup.string()
      .label("confirm password")
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
      username: Yup.string().required(),
      ime_prezime: Yup.string().required(),
  });
  