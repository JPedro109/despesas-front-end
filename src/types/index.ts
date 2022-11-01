export type ExpenseDTO = {
    id: string;
    expenseName: string;
    dueDate: string;
    price: number;
}

export type ListExpensesDTO = {
    expenses: ExpenseDTO[]
}