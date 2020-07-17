import React, {
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal
} from 'react-native';

interface GoalInputProps {
  onAddGoal: Function
  onCancelGoal: Function
  visible: Boolean
}

const GoalInput = (props: GoalInputProps) => {
  const [enteredGoal, setEnteredGoal]: [string, Dispatch<SetStateAction<string>>] = useState('');

  const goalInputHandler = (enteredText: string) => setEnteredGoal(enteredText)

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  }

  const cancelGoalHandler = () => {
    props.onCancelGoal();
    setEnteredGoal('');
  }

  return (
    <Modal visible={props.visible.valueOf()} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="CANCEL"
              color="red"
              onPress={cancelGoalHandler}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="ADD"
              onPress={addGoalHandler}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  },
  button: {
    width: '40%'
  }
});

export default GoalInput;