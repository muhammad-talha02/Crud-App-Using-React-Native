import { data } from "@/utils/db/todos";
import { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TodoType } from "@/types/todo";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext, ThemeContextProps } from "@/context/ThemeContext";
import { ThemeType } from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";

export default function Home() {
  // Theme Context
  const { theme, colorScheme, setColorScheme } = useContext(
    ThemeContext
  ) as ThemeContextProps;
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");
  const [loaded, error] = useFonts({ Inter_500Medium });

  if (!loaded && !error) {
    return null;
  }

  //? Add Todo
  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      let currentTodos = [...todos];
      currentTodos.unshift({ id: newId, title: text, completed: false });
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

  //! Styles
  const styles = createStyles(theme, colorScheme)

  //! Render Item
  const renderItem = ({ item }: { item: TodoType }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoItemText, item.completed && styles.completedText]}
        onPress={() => updateTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => deleteTodo(item.id)}>
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
        {/* //? Theme Toggle Button */}
        <Pressable
          onPress={() =>
            setColorScheme(
              colorScheme === ThemeType.dark ? ThemeType.light : ThemeType.dark
            )
          }
          style={{ marginLeft: 10 }}
        >
          {colorScheme === ThemeType.dark ? (
            <Octicons name="moon" size={32} color={theme.text} />
          ) : (
            <Octicons name="sun" size={32} color={theme.text} />
          )}
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<View style={[styles.todoItemText,{marginHorizontal:"auto"}]}>Not found!</View>}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme:any, colorScheme:ThemeType) =>{
return StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.background,
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
    fontFamily: "Inter_500Medium",
    minWidth: 0,
    color: theme.text,
  },
  addButton: {
    backgroundColor: theme.button,
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: colorScheme === 'dark' ? 'black': 'white',
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
  todoItemText: {
    fontFamily: "Inter_500Medium",
    flex: 1,
    fontSize: 18,
    color: theme.text,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
}

