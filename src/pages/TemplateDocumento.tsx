import { useState } from "react";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Plus,
  Pencil,
  PowerOff,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const mockTemplates = [
  { nome: "Laudo Médico Padrão", tipo: "Laudo Médico", versao: "2.1", ativo: true, data: "01/03/2024" },
  { nome: "Receita Controlada A2", tipo: "Receita Médica", versao: "1.0", ativo: true, data: "15/01/2024" },
  { nome: "Formulário Socioeconômico", tipo: "Declaração Socioeconômica", versao: "3.0", ativo: true, data: "10/11/2023" },
  { nome: "Exame Laboratorial v1", tipo: "Exame Laboratorial", versao: "1.2", ativo: false, data: "20/08/2023" },
  { nome: "Receita Simples", tipo: "Receita Médica", versao: "0.9", ativo: false, data: "05/06/2023" },
];

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl card-surface rounded-xl shadow-lg animate-fade-in">
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

export default function TemplateDocumento() {
  const [modal, setModal] = useState(false);
  const [activeToggle, setActiveToggle] = useState(true);

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Templates de Documentos</h1>
            <p className="page-subtitle">Modelos base para geração de documentos</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            <Plus className="w-4 h-4" />
            Novo Template
          </button>
        </div>

        <div className="card-surface rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome do Template</th>
                  <th>Tipo de Documento</th>
                  <th>Versão</th>
                  <th>Ativo</th>
                  <th>Data de Criação</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockTemplates.map((t) => (
                  <tr key={t.nome}>
                    <td className="font-medium">{t.nome}</td>
                    <td>
                      <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                        {t.tipo}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                        v{t.versao}
                      </span>
                    </td>
                    <td><StatusBadge status={t.ativo ? "Ativo" : "Inativo"} /></td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{t.data}</td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-md hover:bg-[hsl(var(--accent))]" title="Editar" style={{ color: "hsl(var(--primary))" }}>
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-[hsl(var(--accent))]" title="Desativar" style={{ color: "hsl(var(--muted-foreground))" }}>
                          <PowerOff className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-sm" style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            <span>5 templates cadastrados</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-2.5 py-1 rounded text-xs font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>1</span>
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <Modal title="Novo Template de Documento" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div className="form-section">
              <p className="form-section-title">Dados do Template</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Nome do Template *</label>
                  <input type="text" placeholder="Ex: Laudo Médico Padrão" className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Tipo de Documento *</label>
                  <select className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }}>
                    <option value="">Selecione...</option>
                    <option>Laudo Médico</option>
                    <option>Receita Médica</option>
                    <option>Exame Laboratorial</option>
                    <option>Declaração Socioeconômica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Versão</label>
                  <input type="text" placeholder="Ex: 1.0" className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Modelo Base (arquivo)</label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-[hsl(var(--accent)/0.3)] transition-colors" style={{ borderColor: "hsl(var(--border))" }}>
                    <Upload className="w-5 h-5 mx-auto mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }} />
                    <p className="text-xs font-medium">Selecionar arquivo modelo</p>
                    <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>DOCX, PDF até 10MB</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 px-3 rounded-md" style={{ background: "hsl(var(--muted))" }}>
                  <label className="text-sm font-medium">Template ativo</label>
                  <button onClick={() => setActiveToggle(!activeToggle)} className="transition-transform active:scale-95">
                    {activeToggle
                      ? <ToggleRight className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />
                      : <ToggleLeft className="w-8 h-8" style={{ color: "hsl(var(--muted-foreground))" }} />
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-md hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>Cancelar</button>
              <button className="px-5 py-2 text-sm font-semibold rounded-md hover:opacity-90" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>Salvar Template</button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
