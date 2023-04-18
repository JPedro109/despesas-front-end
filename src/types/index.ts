export type ExpenseDTO = {
    id: string;
    expenseName: string;
    dueDate: string;
    expenseValue: number;
}

export type ListExpensesDTO = {
    expenses: ExpenseDTO[]
}