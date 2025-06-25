import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginRegister from './component/LoginRegister';
import Home from './component/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginRegister/>}></Route>
      <Route path='/register' element={<LoginRegister/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App
