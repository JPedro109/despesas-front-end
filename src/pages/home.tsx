import React from 'react';

import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import { ContainerMain } from "../components/ContainerMain";
import { PrivateRoute } from '../components/PrivateRoute';

import { InformationContainer } from '../styles/pages/home';

import { auth } from "../services/auth";
import { api } from '../services/api';

const Home = ({ expenses }: any) => {

    const handleTotalPrice = () => {
        let price = 0;

        expenses.map((expense: any) => ( 
              price += expense.price
        ));

        return price;
    }

    const handleDueExpense = () => {
        let dueExpense = 0;

        expenses.map((expense: any) => (
            Date.now() > Date.parse(expense.dueDate) ? dueExpense++ : null
        ));

        return dueExpense;
    }

    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <InformationContainer>
                    <h2>Total de Despesas</h2>
                    <span>{expenses.length}</span>
                </InformationContainer>
                <InformationContainer>
                    <h2>Total à Pagar</h2>
                    <span>R$ {handleTotalPrice()}</span>
                </InformationContainer>
                <InformationContainer>
                    <h2>Despesas Vencidas</h2>
                    <span>{handleDueExpense()}</span>
                </InformationContainer>
            </ContainerMain>
        </>
     );
}

export const getServerSideProps = async (context: any) => {

    if(auth(context))
        return auth(context);

    const fetch = await api.server(context)
                    .get("/expenses")
                    .then(({ data }) => data);

    const data = await fetch.response;

    return {
            props: {
                expenses: data
            }
        }
}

export default PrivateRoute(Home);