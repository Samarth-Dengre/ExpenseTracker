import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenseContext";

function AllExpensesScreen() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={expensesContext.expenses}
        expensesPeriod="Total"
        fallbackText="No registered expenses!!"
      />
    </View>
  );
}

export default AllExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
