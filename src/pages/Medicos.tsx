import { useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Plus,
  Pencil,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  UserCheck,
  Stethoscope,
} from "lucide-react";

const mockMedicos = [
  { nome: "Dr. Eduardo Souza", crm: "12345", uf: "GO", especialidade: "Clínica Geral", telefone: "(62) 9 9123-4567" },
  { nome: "Dra. Luciana Moraes", crm: "67890", uf: "GO", especialidade: "Oncologia", telefone: "(62) 9 8234-5678" },
  { nome: "Dr. Roberto Alves", crm: "11111", uf: "GO", especialidade: "Cardiologia", telefone: "(62) 9 7345-6789" },
  { nome: "Dr. Carlos Mendes", crm: "22222", uf: "DF", especialidade: "Neurologia", telefone: "(61) 9 6456-7890" },
  { nome: "Dra. Fernanda Castro", crm: "33333", uf: "GO", especialidade: "Clínica Geral", telefone: "(62) 9 5567-8901" },
];

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto card-surface rounded-xl shadow-lg animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>{label}</label>
      <input type={type} placeholder={placeholder} className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }} />
    </div>
  );
}

const especialidades = ["Clínica Geral", "Cardiologia", "Oncologia", "Neurologia", "Ortopedia", "Pediatria", "Psiquiatria", "Ginecologia"];
const estados = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];

export default function Medicos() {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = mockMedicos.filter(
    (m) =>
      m.nome.toLowerCase().includes(search.toLowerCase()) ||
      m.crm.includes(search) ||
      m.especialidade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Médicos</h1>
            <p className="page-subtitle">{mockMedicos.length} médicos vinculados ao sistema</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            <Plus className="w-4 h-4" />
            Novo Médico
          </button>
        </div>

        <div className="filter-bar">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
            <input
              type="text"
              placeholder="Buscar por nome, CRM ou especialidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <select
            className="px-3 py-2 text-sm rounded-md border bg-background focus:outline-none"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
          >
            <option value="">Todas as especialidades</option>
            {especialidades.map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>

        <div className="card-surface rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>CRM</th>
                  <th>UF CRM</th>
                  <th>Especialidade</th>
                  <th>Telefone</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.crm}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                          <Stethoscope className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-sm">{m.nome}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs font-semibold" style={{ color: "hsl(var(--primary))" }}>{m.crm}</td>
                    <td>
                      <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>{m.uf}</span>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{m.especialidade}</span>
                    </td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{m.telefone}</td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-md hover:bg-[hsl(var(--accent))]" title="Visualizar" style={{ color: "hsl(var(--primary))" }}>
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-[hsl(var(--accent))]" title="Editar" style={{ color: "hsl(var(--muted-foreground))" }}>
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Nenhum médico encontrado</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-sm" style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            <span>Mostrando {filtered.length} de {mockMedicos.length} médicos</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-2.5 py-1 rounded text-xs font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>1</span>
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <Modal title="Cadastrar Médico" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div className="form-section">
              <p className="form-section-title">Dados Pessoais</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><FormField label="Nome Completo *" placeholder="Nome completo do médico" /></div>
                <FormField label="CPF *" placeholder="000.000.000-00" />
                <FormField label="Telefone" placeholder="(00) 9 0000-0000" />
                <div className="col-span-2"><FormField label="E-mail" placeholder="medico@email.com" type="email" /></div>
              </div>
            </div>
            <div className="form-section">
              <p className="form-section-title">Dados Profissionais</p>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="CRM *" placeholder="Número do CRM" />
                <div>
                  <label className="block text-xs font-medium mb-1.5">UF CRM *</label>
                  <select className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }}>
                    {estados.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5">Especialidade *</label>
                  <select className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }}>
                    <option value="">Selecione a especialidade...</option>
                    {especialidades.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div className="col-span-2"><FormField label="Unidade de Saúde" placeholder="Nome da unidade de saúde" /></div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-md hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>Cancelar</button>
              <button className="px-5 py-2 text-sm font-semibold rounded-md hover:opacity-90" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>Salvar Médico</button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
