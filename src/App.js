import './App.css';
import Copy from './components/copy';
import Input from './components/input';
import ContextProvider from './context';


function App() {
  return (
    <div className="App">
     <ContextProvider>
     <Input />
     <Copy />              
     </ContextProvider>
    </div>
  );
}

export default App;
