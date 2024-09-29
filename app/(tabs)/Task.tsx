import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

interface Todo {
  id: string;
  task: string;
}

const Task = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

  const handleAddTodo = () => {
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now().toString(),
        task: task.trim(),
      };
      setTodo((prevState) => [...prevState, newTask]);
      setTask("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    const filterTodo = todo.filter((item) => item.id !== id);
    setTodo(filterTodo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>Task</Text>
      <View style={styles.taskContainer}>
        <TextInput
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={handleAddTodo}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todoContainer}>
        <FlatList
          data={todo}
          renderItem={({ item }) => (
            <View style={styles.todoContent}>
              <Text style={styles.task}>{item.task}</Text>
              <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        {/* {todo.map((item) => (
          <View key={item.id} style={styles.todoContent}>
            <Text style={styles.task}>{item.task}</Text>
            <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        ))} */}
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 10,
  },
  taskContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 5,
    height: 40,
    flex: 1,
  },
  btnAdd: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "blue",
    width: 55,
    height: 40,
    borderRadius: 10,
  },
  addText: {
    fontWeight: "bold",
    color: "white",
  },
  //   TodoList
  todoContainer: {
    padding: 5,
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  task: {
    fontWeight: 500,
  },
});
