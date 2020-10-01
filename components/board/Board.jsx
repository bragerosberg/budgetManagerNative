import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, TextInput, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Budget from '../budget/Budget';

export default function Board() {

  const [yearlyBudget, updateYearlyBudget] = useState(120000); // set to set value for development, in production the value is ""
  const [budgetSet, setBudgetStatus] = useState(true); // in product this is falsse 
  let attemptSavedBudget;
  
  _retrieveData = async () => {
    try {
      attemptSavedBudget = await AsyncStorage.getItem('budget');
      if (attemptSavedBudget !== null) {
        console.log(attemptSavedBudget);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // useEffect(() => {
  //   if(attemptSavedBudget !== "" || attemptSavedBudget === undefined) setBudgetStatus(false);
  // }, [attemptSavedBudget ])

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    console.log('I am run');
    updateYearlyBudget(value);
  };

  const resetBudget = () => {
    handleSubmit();
    AsyncStorage.clear();
    updateYearlyBudget("");
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if(yearlyBudget !== "") {
      AsyncStorage.setItem('budget');
      setBudgetStatus(budgetSet => ! budgetSet);
    } else {
      alert('Invalid budget, please enter a valid number');
    }
  };
  
  return budgetSet ? (
    <View>
      <View>
        <Text style={{ textAlign: "center" }}>Yearly: {yearlyBudget}</Text>
      </View>
      <ScrollView>
        <Budget yearlyBudget={yearlyBudget}/>
        <Button
        title="X"
        buttonStyle={{backgroundColor: "red", width: 50, marginTop: 200 }}
        onPress={resetBudget}
        />
      </ScrollView>
    </View>
  ) : (
    <View>
      <Text style={{marginTop: 10, textAlign: "center", fontSize: 32 }}>Budget Manager</Text>
      <TextInput 
        placeholder="Enter yearly budget here"
        keyboardType = 'number-pad'
        onChangeText={updateYearlyBudget}
        inputStyle={{ color: 'black' }}
        style={{textAlign: "center"}}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        buttonStyle={{backgroundColor: "green"}}
      />
    </View>
  );
}
