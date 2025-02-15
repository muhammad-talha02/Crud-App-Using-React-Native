import { data } from "@/utils/db/todos";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TodoType } from "@/types/todo";
export default function Home() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");

  //? Add Todo
  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      let currentTodos = [...todos]
      currentTodos.unshift({ id: newId, title: text, completed: false })
      setTodos(currentTodos);
      setText("");
    }
  };

  //? Update Todo

  const updateTodo = (id: number) => {
    let currenTodos = [...todos];
    currenTodos = currenTodos.map((x) =>
      x.id === id ? { ...x, completed: !x.completed } : x
    );
    setTodos(currenTodos);
  };
  //? Delete Todo
  const deleteTodo = (id: number) => {
    let currenTodos = [...todos];
    currenTodos = currenTodos.filter((x) => x.id !== id);
    setTodos(currenTodos);
  };

  const renderItem = ({ item }:{item:TodoType}) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoItemText, item.completed && styles.completedText]}
        onPress={() => updateTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable
        onPress={() => deleteTodo(item.id)}
      >
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="red"
          selectable={undefined}
        />
      </Pressable>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new todo"
          style={styles.input}
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: "white",
  },
  addButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: "black",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  todoItemText:{
    flex:1,
    fontSize:18,
    color:'white'
  },
  completedText:{
    textDecorationLine:'line-through',
    color:'gray'
  }
});
