import { NavLink, Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>StockFlow</h2>
          <span>Inventory Management</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/warehouses">Warehouses</NavLink>
          <NavLink to="/stock">Stock</NavLink>
          <NavLink to="/movements">Movements</NavLink>
          <NavLink to="/replenishments">Replenishments</NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <span>StockFlow Web</span>
        </header>
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
export default AppLayout;
