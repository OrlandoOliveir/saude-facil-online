import { Search, Bell, LogOut, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TopBar() {
  const [searchValue, setSearchValue] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      className="topbar flex items-center px-6 gap-4 flex-shrink-0 relative z-10"
    >
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "hsl(var(--muted-foreground))" }}
        />
        <input
          type="text"
          placeholder="Buscar por protocolo, paciente ou médico..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn(
            "w-full pl-9 pr-4 py-2 text-sm rounded-md",
            "bg-[hsl(var(--muted))] border border-[hsl(var(--border))]",
            "placeholder:text-[hsl(var(--muted-foreground))]",
            "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:bg-[hsl(var(--card))]",
            "transition-all duration-150"
          )}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <button
          className={cn(
            "relative p-2 rounded-md transition-colors",
            "hover:bg-[hsl(var(--accent))]",
          )}
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <Bell className="w-4 h-4" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "hsl(var(--status-assinado))" }}
          />
        </button>

        {/* Divider */}
        <div
          className="h-6 w-px mx-1"
          style={{ backgroundColor: "hsl(var(--border))" }}
        />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors",
              "hover:bg-[hsl(var(--accent))]",
            )}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              MF
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                Maria Ferreira
              </p>
              <p className="text-[10px] leading-tight" style={{ color: "hsl(var(--muted-foreground))" }}>
                Funcionária
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div
                className="absolute right-0 top-full mt-1 w-52 rounded-md shadow-lg z-20 overflow-hidden card-surface"
              >
                <div
                  className="px-4 py-3"
                  style={{ borderBottom: "1px solid hsl(var(--border))" }}
                >
                  <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    Maria Ferreira
                  </p>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    maria.ferreira@dp.go.gov.br
                  </p>
                </div>
                <div className="py-1">
                  <button
                    className={cn(
                      "w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                      "hover:bg-[hsl(var(--accent))]"
                    )}
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    <User className="w-3.5 h-3.5" />
                    Meu Perfil
                  </button>
                  <button
                    className={cn(
                      "w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                      "hover:bg-[hsl(var(--destructive)/0.08)]"
                    )}
                    style={{ color: "hsl(var(--destructive))" }}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sair do Sistema
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
