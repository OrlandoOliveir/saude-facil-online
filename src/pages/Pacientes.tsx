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
  Users,
} from "lucide-react";

const mockPacientes = [
  { nome: "José Carlos da Silva", cpf: "123.456.789-00", nascimento: "15/03/1968", telefone: "(62) 9 9876-5432", cidade: "Goiânia" },
  { nome: "Maria Aparecida Santos", cpf: "987.654.321-00", nascimento: "22/07/1972", telefone: "(62) 9 8765-4321", cidade: "Aparecida de Goiânia" },
  { nome: "Antônio Pereira Lima", cpf: "456.789.123-00", nascimento: "05/11/1955", telefone: "(62) 9 7654-3210", cidade: "Anápolis" },
  { nome: "Francisca Oliveira", cpf: "321.654.987-00", nascimento: "30/09/1980", telefone: "(62) 9 6543-2109", cidade: "Goiânia" },
  { nome: "Raimundo Neto Costa", cpf: "654.321.987-00", nascimento: "12/04/1965", telefone: "(62) 9 5432-1098", cidade: "Senador Canedo" },
  { nome: "Ana Paula Rodrigues", cpf: "789.123.456-00", nascimento: "08/12/1990", telefone: "(62) 9 4321-0987", cidade: "Goiânia" },
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

export default function Pacientes() {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = mockPacientes.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.cpf.includes(search)
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Pacientes</h1>
            <p className="page-subtitle">{mockPacientes.length} pacientes cadastrados</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            <Plus className="w-4 h-4" />
            Novo Paciente
          </button>
        </div>

        <div className="filter-bar">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
            <input
              type="text"
              placeholder="Buscar por nome ou CPF..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
        </div>

        <div className="card-surface rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>CPF</th>
                  <th>Data de Nascimento</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.cpf}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--primary))" }}>
                          {p.nome.charAt(0)}
                        </div>
                        <span className="font-medium text-sm">{p.nome}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{p.cpf}</td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{p.nascimento}</td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{p.telefone}</td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{p.cidade}</td>
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
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Nenhum paciente encontrado</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-sm" style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            <span>Mostrando {filtered.length} de {mockPacientes.length} pacientes</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-2.5 py-1 rounded text-xs font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>1</span>
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <Modal title="Cadastrar Paciente" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div className="form-section">
              <p className="form-section-title">Dados Pessoais</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><FormField label="Nome Completo *" placeholder="Nome completo do paciente" /></div>
                <FormField label="CPF *" placeholder="000.000.000-00" />
                <FormField label="Data de Nascimento *" placeholder="DD/MM/AAAA" type="date" />
                <FormField label="Telefone" placeholder="(00) 9 0000-0000" />
              </div>
            </div>
            <div className="form-section">
              <p className="form-section-title">Endereço</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><FormField label="Endereço" placeholder="Rua, número, complemento" /></div>
                <FormField label="Cidade" placeholder="Cidade" />
                <div>
                  <label className="block text-xs font-medium mb-1.5">Estado</label>
                  <select className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }}>
                    <option>GO</option><option>SP</option><option>RJ</option><option>MG</option><option>DF</option>
                  </select>
                </div>
                <FormField label="CEP" placeholder="00000-000" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-md hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>Cancelar</button>
              <button className="px-5 py-2 text-sm font-semibold rounded-md hover:opacity-90" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>Salvar Paciente</button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
