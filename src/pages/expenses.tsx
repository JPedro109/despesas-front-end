import React from 'react';
import { useRouter } from 'next/router';

import { ExpenseDTO, ListExpensesDTO } from '../types';
import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import { ContainerMain } from "../components/ContainerMain";

import { Table, UpdateButton, DeleteButton } from "../styles/pages/expenses";

import { auth } from "../services/auth";
import { api } from '../services/api';

import { notification } from '../utils/notification';

const Expenses = ({ expenses }: ListExpensesDTO) => {
    const router = useRouter();

    const handleExpenseDeletion = async (expenseId: string) => {
      await api.client
        .delete(`/expenses/delete/${expenseId}`)
        .catch(({ response }) =>
          response
            ? notification.error(response.data.message)
            : notification.error("Erro no Servidor")
        );

        router.push("/expenses");
    };

    const handleUpdateExpense = (id: string, expenseName: string, dueDate: string, price: number) => {
      router.push(`/update-expense?id=${id}&expenseName=${expenseName}&dueDate=${dueDate.split("T")[0]}&price=${price}`);
    }
    
    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de Vencimento</th>
                            <th>Preço</th>
                            <th>Atualizar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense: ExpenseDTO) => ( 
                        <tr key={expense.id}>
                          <td>{expense.expenseName}</td>
                          <td>{new Date(expense.dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                          <td>{`R$ ${expense.price}`}</td>
                          <td>
                            <UpdateButton onClick={() => handleUpdateExpense(expense.id, expense.expenseName, expense.dueDate, expense.price)}>
                              Atualizar
                            </UpdateButton>
                          </td>
                          <td><DeleteButton onClick={() => handleExpenseDeletion(expense.id)}>Excluir</DeleteButton></td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
            </ContainerMain>
        </>
     );
}

export const getServerSideProps = async (context: any) => {

  if(auth(context))
      return auth(context);

  const fetch = await api.server(context)
                  .get("/expenses")
                  .then(({ data }) => data)

  const expenses = await fetch.response;

  return {
        props: {
            expenses
        }
    }
}

export default Expenses;