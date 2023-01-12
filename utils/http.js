import axios from "axios";
const root = `https://native-afb1f-default-rtdb.firebaseio.com/`;
export async function storeExpense(expenseData) {
  const response = await axios.post(`${root}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${root}/expenses.json`);

  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpnense(id, expenseData) {
  return axios.put(`${root}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(`${root}/expenses/${id}.json`);
}
