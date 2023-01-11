import { createContext, useReducer } from "react";

const DUMMY = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 59.99,
    date: new Date("2022-12-26"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2023-01-02"),
  },
  {
    id: "e4",
    description: "A notebook",
    amount: 1.99,
    date: new Date("2023-01-05"),
  },
  {
    id: "e5",
    description: "A bottle",
    amount: 11.59,
    date: new Date("2022-01-07"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 59.99,
    date: new Date("2022-12-26"),
  },
  {
    id: "e8",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2023-01-02"),
  },
  {
    id: "e9",
    description: "A notebook",
    amount: 1.99,
    date: new Date("2023-01-05"),
  },
  {
    id: "e10",
    description: "A bottle",
    amount: 11.59,
    date: new Date("2022-01-07"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];

    case "UPDATE":
      const updateableItemIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableItem = state[updateableItemIndex];
      const updatedItem = { ...updatableItem, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateableItemIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY);
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
        data: expenseData,
      },
    });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
