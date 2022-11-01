import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";

import { PublicRoute } from "../components/PublicRoute";
import { PagesContainer } from "../components/PagesContainer/index";
import { FormTitle } from "../components/FormTitle/index";
import { FormInput } from "../components/FormInput/index";
import { Button } from "../components/Button/index";
import { LoadingGif } from "../components/LoadingGif/index";

import { Form } from "../styles/form";
import { invalid } from "../utils/messages";
import { isPasswordValid } from "../utils/validations";
import { api } from "../services/api";
import { notification } from "../utils/notification";

const RecoverPassword = () => {
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Atualizar Senha");
  const router = useRouter();
  const [, query] = router.asPath.split("?");

  const handleRecoverPassword = async (e: any) => {
    e.preventDefault();

    const { password, passwordConfirm } = e.target;

    if (!password.value || !passwordConfirm.value) return notification.error("Preencha todos os campos");

    if (!isPasswordValid(password.value)) return notification.error(invalid.password);

    setButtonChildren(<LoadingGif />);

    await api.client
      .patch(`/user/password/password-recover?${query}`, {
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      })
      .then(() => {
        setFormValues({});
        notification.success("Senha atualizada com sucesso");
        router.push("/");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildren("Atualizar Senha");
  };
  
  return (
    <>
      <PagesContainer>
        <Form onSubmit={handleRecoverPassword}>

          <FormTitle>
              Recuperação de Senha
          </FormTitle>

            <FormInput
                type="password"
                placeholder="Nova Senha"
                name="password"
                formValues={formValues}
                setFormValues={setFormValues}
            />

            <FormInput
              type="password"
              placeholder="Confirmação de Nova Senha"
              name="passwordConfirm"
              formValues={formValues}
              setFormValues={setFormValues}
            />

          <Button type="submit">
            {buttonChildren}
          </Button>

        </Form>
      </PagesContainer>
    </>
  );
};
  
export default PublicRoute(RecoverPassword);