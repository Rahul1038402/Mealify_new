import useLenis from './hooks/useLenis';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/Not Found';
import OrderPage from './pages/Order_page';

const App = () => 
  {
  useLenis(); // Smooth scrolling initialization
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/order" element={<OrderPage />} />
            {/*<Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />*/}
          </Routes>
        </BrowserRouter>
  )
}

export default App;
