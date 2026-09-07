import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import MovementsPage from "./pages/MovementsPage";
import ProductsPage from "./pages/ProductsPage";
import ReplenishmentsPage from "./pages/ReplenishmentsPage";
import StockPage from "./pages/StockPage";
import WarehousesPage from "./pages/WarehousesPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products"element={<ProductsPage />} />
        <Route path="warehouses"element={<WarehousesPage />} />
        <Route path="stock"element={<StockPage />} />
        <Route path="movements"element={<MovementsPage />} />
        <Route path="replenishments"element={<ReplenishmentsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
