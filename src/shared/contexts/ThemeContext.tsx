import { createContext, useCallback, useMemo, useState, useContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import { DarkTheme, LightTheme } from '../themes';
import { Box } from '@mui/system';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toogleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface IThemeProviderProps {
    children: React.ReactNode;
}

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IThemeProviderProps> = ({children}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toogleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    return themeName === 'light' ? LightTheme : DarkTheme;
  }, [themeName]);

  return(
    <ThemeContext.Provider value={{themeName, toogleTheme}}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};