import React, {
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  ListRenderItemInfo
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

interface CourseGoal {
  id: string
  value: string
}

export default function App() {
  const [courseGoals, setCourseGoals]: [CourseGoal[], Dispatch<SetStateAction<CourseGoal[] | any>>] = useState([]);
  const [isAddMode, setIsAddMode]: [Boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const addGoalHandler = (enteredGoal: string) => {
    if (enteredGoal.length === 0) return;
    setCourseGoals((courseGoals: CourseGoal[]) => [
      ...courseGoals,
      { id: Math.random().toString(), value: enteredGoal }
    ]);
    setIsAddMode(false);
  }

  const cancelGoalHandler = () => setIsAddMode(false)

  const removeGoalHandler = (goalId: string) => {
    setCourseGoals((courseGoals: CourseGoal[]) =>
      courseGoals.filter((goal: CourseGoal) => goal.id !== goalId)
    )
  }

  const renderItemHandler = (itemData: ListRenderItemInfo<CourseGoal>) => (
    <GoalItem
      id={itemData.item.id}
      title={itemData.item.value}
      onDelete={removeGoalHandler}
    />
  );

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancelGoal={cancelGoalHandler}
      />
      <FlatList
        keyExtractor={(item: CourseGoal) => item.id}
        data={courseGoals}
        renderItem={renderItemHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});