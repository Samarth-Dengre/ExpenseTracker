import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenseContext";
import { deleteExpense, storeExpense, updateExpnense } from "../utils/http";

function ManageExpenseScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation]);

  async function deleteExpenseHandler() {
    setIsLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete!");
      setIsLoading(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        setIsLoading(true);
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpnense(editedExpenseId, expenseData);
      } else {
        setIsLoading(true);
        const id = storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setError("Colud not save data - please try again later");
      setIsLoading(false);
    }
  }

  function errorHandler() {
    setError(null);
  }
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  if (isLoading) return <LoadingOverlay />;
  return (
    <View style={styles.overAllContainer}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={34}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  overAllContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
