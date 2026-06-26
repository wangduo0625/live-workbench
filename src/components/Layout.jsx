import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid, PackageOpen, Activity,
  Settings, Plus
} from "lucide-react";

const navItems = [
  { path: "/", label: "直播间", icon: LayoutGrid },
  { path: "/library", label: "商品库", icon: PackageOpen },
  { path: "/stream", label: "推流监控", icon: Activity },
];

export function Layout({ children, fullScreen = false }) {
  const location = useLocation();

  if (fullScreen) {
    return <div className="app-root">{children}</div>;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="sidebar-brand">
          <div className="sidebar-logo">LC</div>
          <span className="sidebar-brand-name">LiveCopilot</span>
        </Link>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={"nav-item" + (active ? " active" : "")}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <Link to="/create" className="btn btn-primary btn-sm" style={{ width: "100%" }}>
            <Plus size={13} /> 创建直播间
          </Link>
          <div className="sidebar-user">
            <div className="sidebar-avatar">张</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">张场控</div>
              <div className="sidebar-user-role">品牌自播团队</div>
            </div>
            <Settings size={14} />
          </div>
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
