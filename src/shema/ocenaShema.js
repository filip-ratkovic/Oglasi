import * as yup from "yup";

export const ocenaSchema = yup.object({
    komunikacija: yup
      .string()
      .required("Obavezno polje"),
    dogovor: yup
      .string()
      .required("Obavezno polje"),
      komentar: yup
      .string()
      .required("Obavezno polje"),
      ocena: yup
      .string()
      .required("Obavezno polje"),
  });