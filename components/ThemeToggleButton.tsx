import { ThemeType } from "@/constants/Colors";
import { ThemeContext, ThemeContextProps } from "@/context/ThemeContext";
import { Octicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Pressable } from "react-native";

const ThemeToggleButton = () => {
  //? Context
  const { theme, colorScheme, setColorScheme } = useContext(
    ThemeContext
  ) as ThemeContextProps;
  return (
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
  );
};

export default ThemeToggleButton;
