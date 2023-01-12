import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenseContext";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

function RecentExpensesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo && expense.date <= today;
  });

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  if (isFetching) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        fallbackText="No expenses registered for last 7 days"
      />
    </View>
  );
}

export default RecentExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
