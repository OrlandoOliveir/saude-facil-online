import { useState } from "react";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Filter,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockSolicitacoes = [
  { protocolo: "DPES-2024-001234", paciente: "José Carlos da Silva", medico: "Dr. Eduardo Souza", status: "Criado", data: "12/06/2024" },
  { protocolo: "DPES-2024-001235", paciente: "Maria Aparecida Santos", medico: "Dra. Luciana Moraes", status: "Assinado", data: "11/06/2024" },
  { protocolo: "DPES-2024-001236", paciente: "Antônio Pereira Lima", medico: "Dr. Roberto Alves", status: "Em revisão", data: "10/06/2024" },
  { protocolo: "DPES-2024-001237", paciente: "Francisca Oliveira", medico: "Dr. Eduardo Souza", status: "Enviado", data: "09/06/2024" },
  { protocolo: "DPES-2024-001238", paciente: "Raimundo Neto Costa", medico: "Dra. Luciana Moraes", status: "Negado", data: "08/06/2024" },
  { protocolo: "DPES-2024-001239", paciente: "Ana Paula Rodrigues", medico: "Dr. Carlos Mendes", status: "Criado", data: "07/06/2024" },
  { protocolo: "DPES-2024-001240", paciente: "Paulo Roberto Ferreira", medico: "Dr. Eduardo Souza", status: "Assinado", data: "06/06/2024" },
  { protocolo: "DPES-2024-001241", paciente: "Teresinha Gomes", medico: "Dr. Carlos Mendes", status: "Em revisão", data: "05/06/2024" },
];

type ModalType = "nova" | "visualizar" | null;

export default function Solicitacoes() {
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<(typeof mockSolicitacoes)[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMedico, setFilterMedico] = useState("");
  const [searchProtocolo, setSearchProtocolo] = useState("");

  const filtered = mockSolicitacoes.filter((s) => {
    const matchStatus = !filterStatus || s.status === filterStatus;
    const matchMedico = !filterMedico || s.medico.includes(filterMedico);
    const matchSearch = !searchProtocolo || s.protocolo.includes(searchProtocolo) || s.paciente.toLowerCase().includes(searchProtocolo.toLowerCase());
    return matchStatus && matchMedico && matchSearch;
  });

  return (
    <Layout>
      <div className="page-container">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Solicitações</h1>
            <p className="page-subtitle">Gerenciamento de solicitações de medicamentos</p>
          </div>
          <button
            onClick={() => setModal("nova")}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:opacity-90 active:scale-95"
            )}
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            <Plus className="w-4 h-4" />
            Nova Solicitação
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: "248", color: "hsl(var(--foreground))" },
            { label: "Criadas", value: "87", color: "hsl(var(--status-criado))" },
            { label: "Assinadas", value: "112", color: "hsl(var(--status-assinado))" },
            { label: "Enviadas", value: "49", color: "hsl(var(--status-enviado))" },
          ].map((stat) => (
            <div key={stat.label} className="card-surface px-4 py-3 rounded-lg">
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{stat.label}</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
            <input
              type="text"
              placeholder="Buscar protocolo ou paciente..."
              value={searchProtocolo}
              onChange={(e) => setSearchProtocolo(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
          >
            <option value="">Todos os status</option>
            <option>Criado</option>
            <option>Assinado</option>
            <option>Em revisão</option>
            <option>Enviado</option>
            <option>Negado</option>
          </select>
          <select
            value={filterMedico}
            onChange={(e) => setFilterMedico(e.target.value)}
            className="px-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
          >
            <option value="">Todos os médicos</option>
            <option>Dr. Eduardo Souza</option>
            <option>Dra. Luciana Moraes</option>
            <option>Dr. Roberto Alves</option>
            <option>Dr. Carlos Mendes</option>
          </select>
          {(filterStatus || filterMedico || searchProtocolo) && (
            <button
              onClick={() => { setFilterStatus(""); setFilterMedico(""); setSearchProtocolo(""); }}
              className="flex items-center gap-1 px-3 py-2 text-xs rounded-md transition-colors hover:bg-[hsl(var(--accent))]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <X className="w-3 h-3" /> Limpar
            </button>
          )}
        </div>

        {/* Table */}
        <div className="card-surface rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Protocolo</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.protocolo}>
                    <td>
                      <span className="font-mono text-xs font-medium" style={{ color: "hsl(var(--primary))" }}>
                        {row.protocolo}
                      </span>
                    </td>
                    <td className="font-medium">{row.paciente}</td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{row.medico}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{row.data}</td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => { setSelectedItem(row); setModal("visualizar"); }}
                          className="p-1.5 rounded-md transition-colors hover:bg-[hsl(var(--accent))]"
                          title="Visualizar"
                          style={{ color: "hsl(var(--primary))" }}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded-md transition-colors hover:bg-[hsl(var(--accent))]"
                          title="Editar"
                          style={{ color: "hsl(var(--muted-foreground))" }}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Nenhuma solicitação encontrada
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="flex items-center justify-between px-4 py-3 text-sm"
            style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
          >
            <span>Mostrando {filtered.length} de {mockSolicitacoes.length} registros</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 rounded text-xs font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>1</span>
              <button className="px-2.5 py-1 rounded text-xs hover:bg-[hsl(var(--accent))]">2</button>
              <button className="px-2.5 py-1 rounded text-xs hover:bg-[hsl(var(--accent))]">3</button>
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nova Solicitação */}
      {modal === "nova" && (
        <Modal title="Nova Solicitação" onClose={() => setModal(null)}>
          <NovaSolicitacaoForm onClose={() => setModal(null)} />
        </Modal>
      )}

      {/* Modal Visualizar */}
      {modal === "visualizar" && selectedItem && (
        <Modal title="Detalhes da Solicitação" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="form-section">
              <p className="form-section-title">Informações do Protocolo</p>
              <div className="grid grid-cols-2 gap-3">
                <InfoField label="Protocolo" value={selectedItem.protocolo} mono />
                <InfoField label="Status" value={<StatusBadge status={selectedItem.status} />} />
                <InfoField label="Data de Criação" value={selectedItem.data} />
              </div>
            </div>
            <div className="form-section">
              <p className="form-section-title">Partes Envolvidas</p>
              <div className="grid grid-cols-2 gap-3">
                <InfoField label="Paciente" value={selectedItem.paciente} />
                <InfoField label="Médico" value={selectedItem.medico} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}

function NovaSolicitacaoForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="form-section">
        <p className="form-section-title">Dados da Solicitação</p>
        <div className="space-y-3">
          <FormField label="Paciente *" placeholder="Digite o nome ou CPF do paciente..." />
          <FormField label="Médico *" placeholder="Digite o nome ou CRM do médico..." />
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
              Status inicial
            </label>
            <div className="px-3 py-2 rounded-md text-sm" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}>
              <StatusBadge status="Criado" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-md transition-colors hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>
          Cancelar
        </button>
        <button className="px-5 py-2 text-sm font-semibold rounded-md transition-all hover:opacity-90" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          Salvar Solicitação
        </button>
      </div>
    </div>
  );
}

function InfoField({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs mb-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</p>
      <div className={cn("text-sm font-medium", mono && "font-mono")} style={{ color: "hsl(var(--foreground))" }}>
        {value}
      </div>
    </div>
  );
}

function FormField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background"
        style={{ borderColor: "hsl(var(--border))" }}
      />
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto card-surface rounded-xl shadow-lg animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <h2 className="text-base font-semibold" style={{ color: "hsl(var(--foreground))" }}>{title}</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
