import React, { ReactElement, useState } from "react";

import { PrivateRoute } from "../components/PrivateRoute";
import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import { ContainerMain } from "../components/ContainerMain";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { LoadingGif } from "../components/LoadingGif";

import { Form } from "../styles/form";

import { useAuth } from "../providers/AuthProvider";

import { api } from "../services/api";

import { isEmailValid, isPasswordValid } from "../utils/validations";
import { invalid } from "../utils/messages";
import { notification } from "../utils/notification";

const ConfigUser = () => {
  const { handleLogout } = useAuth();
  const [formValues, setFormValues] = useState({});
  const [buttonChidrenEmail, setButtonChildrenEmail] = useState<string | ReactElement>("Atualizar Email");
  const [buttonChidrenPassword, setButtonChildrenPassword] = useState<string | ReactElement>("Atualizar Senha");
  const [buttonChidrenDelete, setButtonChildrenDelete] = useState<string | ReactElement>("Excluir Usuário");

  const handleUpdateEmail = async (e: any) => {
    e.preventDefault();

    const { email } = e.target;

    if (!email.value) return notification.error("Preencha o campo de email");

    if (!isEmailValid(email.value)) return notification.error("Coloque um email válido");

    setButtonChildrenEmail(<LoadingGif />);

    await api.client
      .post("/user/email/send-token-update-email", {
        email: email.value,
      })
      .then(() => {
        setFormValues({});
        notification.success("E-mail cadastrado com sucesso");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildrenEmail("Atualizar Email");
  };

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();

    const { passwordCurrent, newPassword, newPasswordConfirm } = e.target;

    if (
      !passwordCurrent.value ||
      !newPassword.value ||
      !newPasswordConfirm.value
    )
      return notification.error("Preencha todos os campos");

    if (!isPasswordValid(passwordCurrent.value)) return notification.error("Senha atual incorreta");

    if (!isPasswordValid(newPassword.value)) return notification.error(invalid.password);

    if (newPassword.value !== newPasswordConfirm.value) return notification.error("As senhas não coincidem");

    setButtonChildrenPassword(<LoadingGif />);

    await api.client
      .patch(`/user/password/update`, {
        passwordCurrent: passwordCurrent.value,
        password: newPassword.value,
        passwordConfirm: newPasswordConfirm.value,
      })
      .then(() => {
        setFormValues({});
        notification.error("Senha atualizada com sucesso");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildrenPassword("Atualizar Senha");
  };

  const handleDeleteUser = async (e: any) => {
    e.preventDefault();

    const { password, passwordConfirm } = e.target;

    if (!password.value || !passwordConfirm.value)
      return notification.error("Preencha todos os campos");

    if (!isPasswordValid(password.value)) return notification.error("Senha incorreta");

    if (password.value !== passwordConfirm.value) return notification.error("As senhas não coincidem");

    setButtonChildrenDelete(<LoadingGif />);

    await api.client
      .delete(`/user/delete`, {
        data: {
          password: password.value,
          passwordConfirm: passwordConfirm.value,
        },
      })
      .then(() => {
        setFormValues({});
        handleLogout();
        notification.error("Usuário deletado com sucesso");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildrenDelete("Excluir Usuário");
  };

  return (
    <>
      <Header />
      <Aside />
      <ContainerMain>
        <Form onSubmit={handleUpdateEmail}>
          <h2>Atualizar Email</h2>

          <FormInput type="email" placeholder="Email" name="email" formValues={formValues} setFormValues={setFormValues}/>

          <Button type="submit">{buttonChidrenEmail}</Button>
        </Form>

        <Form onSubmit={handleUpdatePassword}>
          <h2>Atualizar Senha</h2>

          <FormInput
            type="password"
            placeholder="Senha Atual"
            name="passwordCurrent"
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <FormInput
            type="password"
            placeholder="Nova Senha"
            name="newPassword"
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <FormInput
            type="password"
            placeholder="Confirmação de Nova Senha"
            name="newPasswordConfirm"
            formValues={formValues}
            setFormValues={setFormValues}
          />

            <Button type="submit">{buttonChidrenPassword}</Button>
        </Form>

        <Form onSubmit={handleDeleteUser}>
          <h2>Excluir Usuário</h2>

          <FormInput 
            type="password" 
            placeholder="Senha" 
            name="password" 
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput
            type="password"
            placeholder="Confirmação de Senha"
            name="passwordConfirm"
            formValues={formValues}
            setFormValues={setFormValues}
          />

            <Button type="submit">{buttonChidrenDelete}</Button>
        </Form>
      </ContainerMain>
    </>
  );
};

export default PrivateRoute(ConfigUser);