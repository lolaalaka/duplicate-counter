import "./App.css";
import Copy from "./components/copy";
import Input from "./components/input";
import ContextProvider from "./context";
import Heading from "./components/heading";
import AuthProvider from "./lib/auth";
import Signout from "./components/signout";
import Layout from "./layout/layout";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Layout>
          <ContextProvider>
            <Heading />
            <Signout />
            <Input />
            <Copy />
          </ContextProvider>
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default App;
