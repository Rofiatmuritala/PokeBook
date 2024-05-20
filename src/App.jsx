import react from "react";
import { HomeView } from "./components/HomeView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListView } from "./components/ListView";
import Details from "./components/Details";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/listviews" element={<ListView />} />
          <Route path="/detail" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
