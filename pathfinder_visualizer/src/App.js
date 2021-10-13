import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import PathfinderVisualizer from "./components/PathfinderVisualizer/PathfinderVisualizer";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <PathfinderVisualizer />
      </ThemeProvider>
    </>
  );
}

export default App;
