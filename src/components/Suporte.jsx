import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { LifeBuoy, Plus, CheckCircle2, Clock } from 'lucide-react';

export default function Suporte() {
  const { tickets, addTicket } = useProject();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dúvidas');

  const categories = ['Alteração', 'Correção', 'Dúvidas', 'Nova funcionalidade', 'Manutenção'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTicket(category, title);
    setTitle('');
    setModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER CARD */}
      <div className="vance-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Central de Suporte & Chamados</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Abra chamados técnicos, tire dúvidas ou solicite novas funcionalidades com SLA garantido.
          </p>
        </div>

        <button className="vance-btn primary" onClick={() => setModalOpen(true)}>
          <Plus size={15} strokeWidth={1.75} />
          <span>Abrir Chamado</span>
        </button>
      </div>

      {/* TICKETS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tickets.length === 0 ? (
          <div className="vance-card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-subtle)' }}>
            Nenhum chamado de suporte aberto.
          </div>
        ) : (
          tickets.map(tk => (
            <div key={tk.id} className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>{tk.title}</h3>
                    <span className="vance-badge active">{tk.category}</span>
                    <span className={`vance-badge ${tk.status === 'Respondido' ? 'active' : 'muted'}`}>
                      {tk.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    Resposta Vance: {tk.response}
                  </p>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                  Aberto em: {tk.date}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL NOVO CHAMADO */}
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
          <div className="vance-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '28px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Abrir Chamado de Suporte</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Categoria do Chamado
                </label>
                <select
                  className="vance-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Descrição / Assunto
                </label>
                <textarea
                  className="vance-textarea"
                  placeholder="Descreva com detalhes a sua necessidade..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  <span>Criar Chamado</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
