// import './App.css'
// import './index.css'
// import Navbar from './components/Navbar'
// import Homescreen from './components/screens/Homescreen'
// import {BrowserRouter,Route,Link, Routes} from "react-router-dom"

// function App() {

//   return (
//     <>
//     <div className="App">
//       <Navbar/>
//       <BrowserRouter>
//       <Routes>
//       <Route path='/home' exact component={Homescreen}/>

//       </Routes>
//       </BrowserRouter>
      

//     </div>
//     </>
//   )
// }

// export default App
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Homescreen from './components/screens/Homescreen';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Bookingscreen from './components/screens/Bookingscreen';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/book/:roomid"element={<Bookingscreen/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

