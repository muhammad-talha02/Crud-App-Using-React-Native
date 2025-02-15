import { createContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors, ThemeType } from "@/constants/Colors";


export interface ThemeContextProps {
  theme:any,
  colorScheme:ThemeType
  setColorScheme: (color:ThemeType)=> void
}
export const ThemeContext = createContext<ThemeContextProps | {}>({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
console.log({colorScheme})
  const theme = colorScheme === ThemeType.dark  ? Colors.dark : Colors.light;
  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
