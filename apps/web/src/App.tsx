import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home";
import Board from "./pages/board";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/board/:boardId" element={<Board />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
