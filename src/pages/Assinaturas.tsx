import { useState } from "react";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  Upload,
  FileText,
  Shield,
} from "lucide-react";

const mockAssinaturas = [
  { documento: "laudo_medico_jose_silva.pdf", medico: "Dr. Eduardo Souza", tipo: "Digital", status: "Assinado", data: "12/06/2024", ip: "192.168.1.45" },
  { documento: "receita_maria_santos.pdf", medico: "Dra. Luciana Moraes", tipo: "Certificado", status: "Pendente", data: "—", ip: "—" },
  { documento: "exame_antonio_lima.pdf", medico: "Dr. Roberto Alves", tipo: "Upload", status: "Assinado", data: "10/06/2024", ip: "10.0.0.12" },
  { documento: "declaracao_francisca.pdf", medico: "Dr. Eduardo Souza", tipo: "Digital", status: "Recusado", data: "09/06/2024", ip: "172.16.0.1" },
  { documento: "laudo_raimundo_neto.pdf", medico: "Dr. Carlos Mendes", tipo: "Digital", status: "Pendente", data: "—", ip: "—" },
];

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg card-surface rounded-xl shadow-lg animate-fade-in">
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

export default function Assinaturas() {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<(typeof mockAssinaturas)[0] | null>(null);
  const [signed, setSigned] = useState(false);

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Assinaturas</h1>
            <p className="page-subtitle">Controle de assinaturas de documentos médicos</p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Total de Documentos", value: "5" },
            { label: "Pendentes", value: "2", color: "hsl(var(--status-revisao))" },
            { label: "Assinados", value: "2", color: "hsl(var(--status-assinado))" },
          ].map((s) => (
            <div key={s.label} className="card-surface px-4 py-3 rounded-lg">
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: s.color ?? "hsl(var(--foreground))" }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="card-surface rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Médico</th>
                  <th>Tipo de Assinatura</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>IP</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockAssinaturas.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                        <span className="text-sm truncate max-w-[160px]">{a.documento}</span>
                      </div>
                    </td>
                    <td style={{ color: "hsl(var(--muted-foreground))" }}>{a.medico}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3" style={{ color: "hsl(var(--primary))" }} />
                        <span className="text-xs">{a.tipo}</span>
                      </div>
                    </td>
                    <td><StatusBadge status={a.status} /></td>
                    <td className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{a.data}</td>
                    <td className="font-mono text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{a.ip}</td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => { setSelected(a); setSigned(false); setModal(true); }}
                          className="p-1.5 rounded-md hover:bg-[hsl(var(--accent))]"
                          title="Visualizar e Assinar"
                          style={{ color: "hsl(var(--primary))" }}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-sm" style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            <span>5 registros</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-2.5 py-1 rounded text-xs font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>1</span>
              <button className="p-1.5 rounded hover:bg-[hsl(var(--accent))] disabled:opacity-40" disabled><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {modal && selected && (
        <Modal title="Assinar Documento" onClose={() => setModal(false)}>
          {!signed ? (
            <div className="space-y-4">
              <div className="rounded-lg p-4" style={{ background: "hsl(var(--muted))" }}>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                  <span className="text-sm font-semibold">{selected.documento}</span>
                </div>
                <div className="h-24 rounded flex items-center justify-center" style={{ background: "hsl(var(--accent))", border: "1px dashed hsl(var(--border))" }}>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Visualização do documento</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5">Upload de assinatura (opcional)</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-[hsl(var(--accent)/0.3)]" style={{ borderColor: "hsl(var(--border))" }}>
                  <Upload className="w-5 h-5 mx-auto mb-1" style={{ color: "hsl(var(--muted-foreground))" }} />
                  <p className="text-xs">Arraste ou clique para selecionar imagem da assinatura</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-md hover:bg-[hsl(var(--accent))]" style={{ color: "hsl(var(--muted-foreground))" }}>Cancelar</button>
                <button
                  onClick={() => setSigned(true)}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md hover:opacity-90 transition-all"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Assinar Documento
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: "hsl(var(--status-enviado-bg))" }}>
                <CheckCircle className="w-8 h-8" style={{ color: "hsl(var(--status-enviado))" }} />
              </div>
              <h3 className="font-semibold text-lg">Documento Assinado!</h3>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>A assinatura foi registrada com sucesso.</p>
              <button onClick={() => setModal(false)} className="mt-2 px-6 py-2 text-sm font-semibold rounded-md hover:opacity-90" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                Fechar
              </button>
            </div>
          )}
        </Modal>
      )}
    </Layout>
  );
}
