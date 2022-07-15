import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./Pages/Formulario/Formulario";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import Detalle from "./Pages/Detalle/Detalle";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/formulario" element={<Formulario />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/character/:id" element={<Detalle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
