import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { GitPullRequest, Plus, CheckCircle2, Clock, Circle } from 'lucide-react';

export default function Revisoes() {
  const { revisions, addRevision, updateRevisionStatus, currentUserRole } = useProject();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addRevision(title, description);
    setTitle('');
    setDescription('');
    setModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluída':
        return <span className="vance-badge active">Concluída</span>;
      case 'Em desenvolvimento':
        return <span className="vance-badge active">Em desenvolvimento</span>;
      default:
        return <span className="vance-badge muted">Em análise</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER CARD */}
      <div className="vance-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Solicitações de Revisão</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Envie sugestões ou ajustes pontuais no projeto. Acompanhe a análise em tempo real.
          </p>
        </div>

        <button className="vance-btn primary" onClick={() => setModalOpen(true)}>
          <Plus size={15} strokeWidth={1.75} />
          <span>Nova Solicitação</span>
        </button>
      </div>

      {/* REVISIONS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {revisions.length === 0 ? (
          <div className="vance-card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-subtle)' }}>
            Nenhuma solicitação de revisão registrada.
          </div>
        ) : (
          revisions.map(rev => (
            <div key={rev.id} className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>{rev.title}</h3>
                    {getStatusBadge(rev.status)}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{rev.description}</p>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                  {rev.date} • Por {rev.author}
                </div>
              </div>

              {currentUserRole === 'admin' && (
                <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--mono-border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-subtle)', alignSelf: 'center' }}>Alterar status (Admin):</span>
                  <button className="vance-btn sm" onClick={() => updateRevisionStatus(rev.id, 'Em análise')}>Em análise</button>
                  <button className="vance-btn sm" onClick={() => updateRevisionStatus(rev.id, 'Em desenvolvimento')}>Em dev</button>
                  <button className="vance-btn sm primary" onClick={() => updateRevisionStatus(rev.id, 'Concluída')}>Concluir</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* MODAL NOVA SOLICITAÇÃO */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="vance-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '28px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Nova Solicitação de Ajuste</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Título resumido do ajuste
                </label>
                <input
                  type="text"
                  className="vance-input"
                  placeholder="Ex: Troca de botão na seção sobre nós"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Descrição detalhada
                </label>
                <textarea
                  className="vance-textarea"
                  placeholder="Descreva exatamente o que precisa ser alterado..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="vance-btn"
                  style={{ flex: 1 }}
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="vance-btn primary" style={{ flex: 1 }}>
                  <span>Enviar Solicitação</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
