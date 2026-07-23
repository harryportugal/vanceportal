import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { CheckSquare, CheckCircle2, Plus } from 'lucide-react';

export default function Checklist() {
  const { checklist, toggleChecklist, addChecklistItem, currentUserRole } = useProject();
  const [newItemText, setNewItemText] = useState('');
  const [newItemCat, setNewItemCat] = useState('Geral');

  const allCompleted = checklist.length > 0 && checklist.every(item => item.completed);
  const completedCount = checklist.filter(item => item.completed).length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    addChecklistItem(newItemText, newItemCat);
    setNewItemText('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER CARD */}
      <div className="vance-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Checklist do Cliente</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Acompanhe o que a agência precisa para avançar com o seu projeto.
          </p>
        </div>

        <div className="vance-badge active" style={{ padding: '8px 14px', fontSize: '13px' }}>
          <span>{completedCount} de {checklist.length} concluídos</span>
        </div>
      </div>

      {/* SUCCESS STATE WHEN ALL COMPLETED */}
      {allCompleted ? (
        <div className="vance-card animate-fade-in" style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '40px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CheckCircle2 size={40} color="var(--text-main)" strokeWidth={1.75} />
          <h3 style={{ fontSize: '18px', color: 'var(--text-main)', margin: 0 }}>
            Você concluiu todas as pendências.
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '500px' }}>
            Excelente! Todas as informações essenciais foram entregues. Nossa equipe de desenvolvimento está dando andamento total ao seu projeto.
          </p>
        </div>
      ) : (
        <div className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: item.completed ? 'var(--bg-secondary)' : 'var(--bg-card-hover)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--text-main)'
                  }}
                />
                <span style={{
                  fontSize: '14px',
                  color: item.completed ? 'var(--text-subtle)' : 'var(--text-main)',
                  textDecoration: item.completed ? 'line-through' : 'none'
                }}>
                  {item.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="vance-badge muted">
                  {item.category}
                </span>
                <span className={`vance-badge ${item.completed ? 'active' : 'subtle'}`}>
                  {item.completed ? 'Entregue' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADMIN ADD ITEM SIMULATION */}
      {currentUserRole === 'admin' && (
        <form onSubmit={handleAdd} className="vance-card" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            className="vance-input"
            placeholder="Nova pendência para o cliente"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <select
            className="vance-select"
            value={newItemCat}
            onChange={(e) => setNewItemCat(e.target.value)}
            style={{ width: '140px' }}
          >
            <option value="Geral">Geral</option>
            <option value="Logos">Logos</option>
            <option value="Textos">Textos</option>
            <option value="Imagens">Imagens</option>
            <option value="Acessos">Acessos</option>
          </select>
          <button type="submit" className="vance-btn primary">
            <Plus size={16} strokeWidth={1.75} />
            <span>Adicionar</span>
          </button>
        </form>
      )}
    </div>
  );
}
