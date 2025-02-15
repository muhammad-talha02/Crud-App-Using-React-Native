import ThemeToggleButton from "@/components/ThemeToggleButton";
import { ThemeType } from "@/constants/Colors";
import { ThemeContext, ThemeContextProps } from "@/context/ThemeContext";
import { TodoType } from "@/types/todo";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoEditScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { theme, colorScheme, setColorScheme } = useContext(
    ThemeContext
  ) as ThemeContextProps;
  const [todo, setTodo] = useState<TodoType>();
  const [loaded, error] = useFonts({ Inter_500Medium });

  useEffect(() => {
    const fetchTodo = async (id: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storedTodos: TodoType[] = !jsonValue
          ? null
          : JSON.parse(jsonValue);
        if (storedTodos && storedTodos.length) {
          const myTodo = storedTodos.find((x) => x.id?.toString() === id);
          setTodo(myTodo);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    fetchTodo(id as string);
  }, [id]);

  if (!loaded && !error) {
    return null;
  }

  //? handle Update
  const handleUpdateTodo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storedTodos: TodoType[] = !jsonValue ? null : JSON.parse(jsonValue);
      if (storedTodos && storedTodos.length) {
        const todoIndex = storedTodos.findIndex((x) => x.id.toString() === id);
        console.log({ todoIndex });
        storedTodos[todoIndex].title = todo?.title as string;
        console.log({ storedTodos });
        await AsyncStorage.setItem("TodoApp", JSON.stringify(storedTodos));
        router.push("/");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const styles = createStyles(theme, colorScheme);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit Todo"
          placeholderTextColor={"gray"}
          value={todo?.title || ""}
          onChangeText={(text) =>
            setTodo((prev) => ({ ...prev, title: text } as TodoType))
          }
          maxLength={30}
        />
        <ThemeToggleButton />
      </View>
      <View
        style={[styles.inputContainer, { gap: 10, justifyContent: "flex-end" }]}
      >
        <Pressable style={[styles.actionButton, { backgroundColor: "red" }]}>
          <Text
            style={[styles.actionButtonText, { color: "white" }]}
            onPress={() => router.push("/")}
          >
            Cancel
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.actionButton,
            { backgroundColor: "green" },
            !todo?.title && styles.disabledButton,
          ]}
        >
          <Text
            style={[styles.actionButtonText, { color: "white" }]}
            onPress={handleUpdateTodo}
            disabled={!todo?.title}
          >
            Update
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, colorScheme: ThemeType) => {
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
    actionButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    actionButtonText: {
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
    disabledButton: {
      pointerEvents: "none",
      opacity: 0.9,
    },
  });
};
