import React, { ReactElement, useState } from "react";

import { PublicRoute } from "../components/PublicRoute";
import { PagesContainer } from "../components/PagesContainer";
import { FormTitle } from "../components/FormTitle";
import { FormInput } from "../components/FormInput";
import { FormLink } from "../components/FormLink";
import { Button } from "../components/Button";
import { LoadingGif } from "../components/LoadingGif";

import { Form } from "../styles/form";
import { isEmailValid } from "../utils/validations";
import { invalid } from "../utils/messages";
import { api } from "../services/api";
import { notification } from "../utils/notification";

const ForgetPassword = () => {

  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Enviar Email");

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    
    const { email } = e.target;

    if (!email.value) return notification.error("Preencha o campo de email");

    if (!isEmailValid(email.value)) return notification.error(invalid.email);

    setButtonChildren(<LoadingGif />);

    await api.client
      .patch("/users/send-password-recovery-link", {
        email: email.value,
      })
      .then(() => {
        setFormValues({});
        notification.success("O link de recuperação de senha foi enviado para seu email, ele é válido por alguns minutos, não esqueça de verificar sua caixa de spam");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildren("Enviar Email");
  };
  
    return (
      <>
        <PagesContainer>
          <Form onSubmit={handleForgetPassword}>
            <FormTitle>
                Esqueci Minha Senha
            </FormTitle>
  
            <FormInput type="email" name="email" placeholder="Email" formValues={formValues} setFormValues={setFormValues} />
  
            <Button type="submit">
              {buttonChildren}
            </Button>
  
            <FormLink link="/">Lembrou sua senha?</FormLink>
          </Form>
        </PagesContainer>
      </>
    );
  };

export default PublicRoute(ForgetPassword);