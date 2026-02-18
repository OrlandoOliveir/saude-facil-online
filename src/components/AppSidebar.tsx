import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  PenTool,
  Users,
  UserCheck,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  FileStack,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Solicitações",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Documentos",
    icon: FileStack,
    children: [
      { label: "Documentos", path: "/documentos" },
      { label: "Template Documento", path: "/documentos/templates" },
    ],
  },
  {
    label: "Assinaturas",
    icon: PenTool,
    path: "/assinaturas",
  },
  {
    label: "Pacientes",
    icon: Users,
    path: "/pacientes",
  },
  {
    label: "Médicos",
    icon: UserCheck,
    path: "/medicos",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Documentos: location.pathname.startsWith("/documentos"),
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (item: NavItem) =>
    item.children?.some((c) => isActive(c.path)) ?? false;

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "relative z-30 flex flex-col h-full transition-all duration-200 ease-in-out flex-shrink-0",
          collapsed ? "w-16" : "w-64"
        )}
        style={{ backgroundColor: "hsl(var(--sidebar-background))" }}
      >
        {/* Logo / Header */}
        <div
          className="flex items-center gap-3 px-4 h-[60px] flex-shrink-0"
          style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}
        >
          <div
            className="flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0"
            style={{ backgroundColor: "hsl(210 80% 55%)" }}
          >
            <Shield className="w-4 h-4" style={{ color: "hsl(0 0% 100%)" }} />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-bold leading-tight truncate" style={{ color: "hsl(var(--sidebar-primary))" }}>
                Defensoria Pública
              </p>
              <p className="text-[10px] leading-tight truncate" style={{ color: "hsl(var(--sidebar-muted))" }}>
                Gestão de Medicamentos
              </p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded transition-colors flex-shrink-0 hover:opacity-70"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            if (item.children) {
              const isOpen = openGroups[item.label] ?? false;
              const groupActive = isGroupActive(item);

              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.label)}
                    className={cn(
                      "sidebar-nav-item w-full",
                      groupActive && !collapsed && "active"
                    )}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {isOpen ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </>
                    )}
                  </button>
                  {!collapsed && isOpen && (
                    <div className="mt-0.5 space-y-0.5">
                      {item.children.map((child) => (
                        <button
                          key={child.path}
                          onClick={() => navigate(child.path)}
                          className={cn(
                            "sidebar-nav-subitem w-full text-left",
                            isActive(child.path) && "active"
                          )}
                        >
                          <span className="w-1 h-1 rounded-full bg-current opacity-50 flex-shrink-0" />
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path!)}
                className={cn(
                  "sidebar-nav-item w-full",
                  isActive(item.path!) && "active"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div
            className="px-4 py-3 text-[10px]"
            style={{
              borderTop: "1px solid hsl(var(--sidebar-border))",
              color: "hsl(var(--sidebar-muted))",
            }}
          >
            <p className="font-medium">v1.0.0 — Sistema Institucional</p>
            <p className="opacity-60">© 2024 Defensoria Pública</p>
          </div>
        )}
      </aside>
    </>
  );
}
