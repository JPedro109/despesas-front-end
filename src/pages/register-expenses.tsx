import React, { ReactElement, useState } from "react";

import { PrivateRoute } from "../components/PrivateRoute";
import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import { ContainerMain } from "../components/ContainerMain";
import { FormInput } from "../components/FormInput/index";
import { Button } from "../components/Button/index";
import { LoadingGif } from "../components/LoadingGif/index";

import { Form } from "../styles/form";
import { api } from "../services/api";
import { notification } from "../utils/notification";

const RegisterExpense = () => {
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Cadastrar Despesa");

  const handleRegisterExpense = async (e: any) => {
    e.preventDefault();
    
    const { expenseName, dueDate, price } = e.target;

    if (!expenseName.value || !dueDate.value || !price.value) return notification.error("Preencha todos os campos");

    setButtonChildren(<LoadingGif />);

    await api.client
      .post("/expenses", {
        expenseName: expenseName.value,
        dueDate: dueDate.value,
        expenseValue: parseInt(price.value),
      })
      .then(() => {
        setFormValues({});
        notification.success("Despesa criada com sucesso");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildren("Cadastrar Despesa");
  };

  return (
    <>
      <Header />
      <Aside />
      <ContainerMain>
        <Form onSubmit={handleRegisterExpense}>
          <FormInput
            type="text"
            placeholder="Nome"
            name="expenseName"
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput
            type="date"
            placeholder="Data de Vencimento"
            name="dueDate"
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput 
            type="number" 
            placeholder="Preço" 
            // min="0"
            name="price" 
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <Button type="submit">
            {buttonChildren}
          </Button>
        </Form>
      </ContainerMain>
    </>
  );
};

export default PrivateRoute(RegisterExpense);