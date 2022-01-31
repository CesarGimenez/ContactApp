import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { useContact } from "../Hook/useContact";

export const AddEditForm = ({ contact, onRefetch, openCloseModal }) => {
  const [validated, setValidated] = useState(false);
  const { addContact, updateContact } = useContact();
  const formik = useFormik({
    initialValues: initialValues(contact),
    validationSchema: Yup.object().shape(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (!contact) {
        await addContact(formValue);
        toast.success("Contacto creado exitosamente");
        onRefetch();
      } else {
        await updateContact(contact._id, formValue);
        toast.success("Contacto actualizado");
      }
      setValidated(true);
      onRefetch();
      openCloseModal();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} noValidate validated={validated}>
      <Form.Group className="mb-2">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Escriba el nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          error={formik.errors.nombre}
        />
        {formik.errors.nombre && (
          <span className="text-danger">{formik.errors.nombre}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Escriba el apellido"
          name="apellido"
          value={formik.values.apellido}
          onChange={formik.handleChange}
          error={formik.errors.apellido}
        />
        {formik.errors.apellido && (
          <span className="text-danger">{formik.errors.apellido}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Escriba el email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <span className="text-danger">{formik.errors.email}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Telefono</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Escriba el telefono"
          name="telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
        />
        {formik.errors.telefono && (
          <span className="text-danger">{formik.errors.telefono}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Direccion</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Escriba la direccion"
          name="direccion"
          value={formik.values.direccion}
          onChange={formik.handleChange}
        />
        {formik.errors.direccion && (
          <span className="text-danger">{formik.errors.direccion}</span>
        )}
      </Form.Group>

      {contact && (
        <Form.Group className="mb-2">
          <Form.Label>Contacto activo</Form.Label>
          <Form.Check
            required
            type="switch"
            name="active"
            checked={formik.values.active}
            onChange={() =>
              formik.setFieldValue("active", !formik.values.active)
            }
          />
        </Form.Group>
      )}

      <Button variant="primary" type="submit" className="mt-3">
        {contact ? `Actualizar contacto` : `Crear Contacto`}
      </Button>
    </Form>
  );
};

const initialValues = (contact) => {
  return {
    nombre: contact?.nombre || "",
    apellido: contact?.apellido || "",
    email: contact?.email || "",
    telefono: contact?.telefono || "",
    direccion: contact?.direccion || "",
    active: contact?.active || true,
  };
};

const newValidationSchema = () => {
  return {
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email("No es un email valido")
      .required("El email es obligatorio"),
    telefono: Yup.number("Solo pueden tipearse numeros").required(
      "El numero telefonico es obligatorio"
    ),
    direccion: Yup.string().required("La direccion es obligatoria"),
    active: Yup.boolean(),
  };
};
