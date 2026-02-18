import { cn } from "@/lib/utils";

type StatusType = "Criado" | "Assinado" | "Em revisão" | "Enviado" | "Negado" | "Pendente" | "Recusado" | "Ativo" | "Inativo";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusConfig: Record<string, { cls: string; dot: string }> = {
  "Criado":      { cls: "badge-criado",   dot: "bg-[hsl(var(--status-criado))]" },
  "Assinado":    { cls: "badge-assinado", dot: "bg-[hsl(var(--status-assinado))]" },
  "Em revisão":  { cls: "badge-revisao",  dot: "bg-[hsl(var(--status-revisao))]" },
  "Enviado":     { cls: "badge-enviado",  dot: "bg-[hsl(var(--status-enviado))]" },
  "Negado":      { cls: "badge-negado",   dot: "bg-[hsl(var(--status-negado))]" },
  "Pendente":    { cls: "badge-criado",   dot: "bg-[hsl(var(--status-criado))]" },
  "Recusado":    { cls: "badge-negado",   dot: "bg-[hsl(var(--status-negado))]" },
  "Ativo":       { cls: "badge-enviado",  dot: "bg-[hsl(var(--status-enviado))]" },
  "Inativo":     { cls: "badge-negado",   dot: "bg-[hsl(var(--status-negado))]" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { cls: "badge-criado", dot: "bg-gray-400" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.cls,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {status}
    </span>
  );
}
