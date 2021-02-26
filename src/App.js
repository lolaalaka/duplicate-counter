import "./App.css";
import Copy from "./components/copy";
import Input from "./components/input";
import ContextProvider from "./context";
import Heading from "./components/heading";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Heading />
        <Input />
        <Copy />
      </ContextProvider>
    </div>
  );
}

export default App;
