import { Routes, Route, Navigate } from "react-router-dom";

import World from "./pages/World";
import Region from "./pages/Region";
import Country from "./pages/Country";
import Forecast from "./pages/Forecast";
import SearchList from "./pages/SearchList";
import Search from "./components/Search";
import Breadcrumb from "./components/Breadcrumb";

export default function App() {
  return (
    <div className="container">
      <main className="d-flex flex-column align-items-center min-vh-100">
        <Search />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Navigate to="/world" replace />} />
          <Route path="/world" element={<World />} />
          <Route path="/region/:region" element={<Region />} />
          <Route path="/country/:country" element={<Country />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/locations" element={<SearchList />} />
        </Routes>
      </main>

      <footer className="footer bg-light text-center">
        <p>Coursework 2025</p>
      </footer>
    </div>
  );
}