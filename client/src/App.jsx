import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Homescreen from './components/screens/Homescreen';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Bookingscreen from './components/screens/Bookingscreen';
import RegisterScreen from './components/screens/RegisterScreen';
import Loginscreen from './components/screens/Loginscreen';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/book/:roomid/:fromdate/:todate"element={<Bookingscreen/>}/>
            <Route path="/register"element={<RegisterScreen/>}/>
            <Route path="/login"element={<Loginscreen/>}/>


          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

