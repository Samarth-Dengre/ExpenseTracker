import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expenseData) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "SET":
      const reverted = action.payload.reverse();
      return reverted;
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
  const [expenseState, dispatch] = useReducer(expensesReducer, []);
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
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
