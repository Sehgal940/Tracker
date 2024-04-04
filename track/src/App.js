import './App.css';
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'
import Context from './context/Context'

function App() {
  return (
    <Context>
    <Nav/>
    <Outlet/>
    </Context>
  );
}

export default App;
