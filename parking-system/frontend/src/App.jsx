import Header from "./components/Header";
import Input from "./components/Input";
import ParkList from "./components/ParkList";
import MainRoute from "./routes/MainRoute";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainRoute />}></Route>
          <Route path="/login/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
