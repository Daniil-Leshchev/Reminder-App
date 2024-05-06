import { StyleSheet, View } from 'react-native';
import Text from "@/components/StyledText";
import React from 'react';
import TaskIcon from '@components/TaskIcon';

const colors = {
  background: '#8A9DCDB5',
  shadow: '#5B64AE33'
}

const TaskItem = ({ task }: any) => {
  return (
    <View style={styles.taskContainer}>
      <TaskIcon type={task.type} isSmall={false}/>
      <Text style={styles.title}>{task.title}</Text>
      { task.isAllDay ? 
        <Text style={styles.time}>весь день</Text> :
        <Text style={styles.time}>{task.startDate}</Text>}
    </View>
  )
}

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 18,
    paddingRight: 28,
    backgroundColor: colors.background,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 40,
  },

  title: {
    fontSize: 16,
    maxWidth: 160,
  },

  time: {
    fontSize: 16,
    marginLeft: 'auto'
  }
});