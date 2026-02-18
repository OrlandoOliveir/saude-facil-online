import { useState } from "react";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Upload,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  File,
  Plus,
  X,
  FileText,
} from "lucide-react";

const mockDocumentos = [
  { nome: "laudo_medico_jose_silva.pdf", tipo: "Laudo Médico", protocolo: "DPES-2024-001234", tamanho: "342 KB", data: "12/06/2024", status: "Assinado" },
  { nome: "receita_maria_santos.pdf", tipo: "Receita Médica", protocolo: "DPES-2024-001235", tamanho: "128 KB", data: "11/06/2024", status: "Criado" },
  { nome: "exame_antonio_lima.pdf", tipo: "Exame Laboratorial", protocolo: "DPES-2024-001236", tamanho: "2.1 MB", data: "10/06/2024", status: "Em revisão" },
  { nome: "declaracao_francisca.pdf", tipo: "Declaração Socioeconômica", protocolo: "DPES-2024-001237", tamanho: "89 KB", data: "09/06/2024", status: "Enviado" },
  { nome: "laudo_raimundo_neto.pdf", tipo: "Laudo Médico", protocolo: "DPES-2024-001238", tamanho: "512 KB", data: "08/06/2024", status: "Negado" },
];

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl card-surface rounded-xl shadow-lg animate-fade-in">
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

export default function Documentos() {
  const [modal, setModal] = useState(false);

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Documentos</h1>
            <p className="page-subtitle">Arquivos vinculados às solicitações</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:opacity-90 active:scale-95"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            <Upload className="w-4 h-4" />
            Upload de Documento
          </button>
        </div>

        <div className="card-surface rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome Original</th>
                  <th>Tipo de Documento</th>
                  <th>Protocolo Vinculado</th>
                  <th>Tamanho</th>
                  <th>Data de Upload</th>
                  <th>Status</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockDocumentos.map((doc) => (
                  <tr key={doc.nome}>
                    <td>
                      <div className="flex items-center gap-2">
                        <File className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                        <span className="text-sm font-medium truncate max-w-[180px]">{doc.nome}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                        {doc.tipo}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-xs" style={{ color: "hsl(var(--primary))" }}>{doc.protocolo}</span>
                    </td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{doc.tamanho}</td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{doc.data}</td>
                    <td><StatusBadge status={doc.status} /></td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-md transition-colors hover:bg-[hsl(var(--accent))]" title="Visualizar" style={{ color: "hsl(var(--primary))" }}>
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md transition-colors hover:bg-[hsl(var(--accent))]" title="Download" style={{ color: "hsl(var(--muted-foreground))" }}>
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 text-sm" style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            <span>5 de 5 documentos</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-2.5 py-1 rounded text-xs font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>1</span>
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <Modal title="Upload de Documento" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div className="form-section">
              <p className="form-section-title">Dados do Documento</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Solicitação *</label>
                  <select className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }}>
                    <option value="">Selecione o protocolo...</option>
                    <option>DPES-2024-001234 — José Carlos da Silva</option>
                    <option>DPES-2024-001235 — Maria Aparecida Santos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Tipo de Documento *</label>
                  <select className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] bg-background" style={{ borderColor: "hsl(var(--border))" }}>
                    <option value="">Selecione o tipo...</option>
                    <option>Laudo Médico</option>
                    <option>Receita Médica</option>
                    <option>Exame Laboratorial</option>
                    <option>Declaração Socioeconômica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Arquivo *</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:bg-[hsl(var(--accent)/0.3)]" style={{ borderColor: "hsl(var(--border))" }}>
                    <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: "hsl(var(--muted-foreground))" }} />
                    <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>Clique para selecionar ou arraste o arquivo</p>
                    <p className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>PDF, DOC, JPG até 20MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-md hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>Cancelar</button>
              <button className="px-5 py-2 text-sm font-semibold rounded-md hover:opacity-90" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>Salvar</button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
