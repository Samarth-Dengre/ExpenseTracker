import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenseContext";
import { getDateMinusDays } from "../utils/date";

function RecentExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo && expense.date <= today;
  });
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
