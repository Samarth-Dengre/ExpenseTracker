import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenseContext";

function ManageExpenseScreen({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, {
        description: "TEST!!!",
        amount: 19.5,
        date: new Date("2022-08-14"),
      });
    } else {
      expenseCtx.addExpense({
        description: "TEST",
        amount: 19.99,
        date: new Date("2022-05-19"),
      });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.overAllContainer}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
