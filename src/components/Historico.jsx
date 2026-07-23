import React from 'react';
import { useProject } from '../context/ProjectContext';
import { History, Calendar, Circle } from 'lucide-react';

export default function Historico() {
  const { historyLog } = useProject();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER CARD */}
      <div className="vance-card" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Histórico de Atividades</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Registro imutável de todas as ações, aprovações e movimentações do projeto.
        </p>
      </div>

      {/* TIMELINE ACTIVITIES */}
      <div className="vance-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          
          {/* Vertical connecting line */}
          <div style={{
            position: 'absolute',
            left: '79px',
            top: '10px',
            bottom: '10px',
            width: '2px',
            backgroundColor: 'var(--bg-secondary)',
            zIndex: 1
          }} />

          {historyLog.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', zIndex: 2 }}>
              <div style={{ width: '60px', textAlign: 'right', flexShrink: 0 }}>
                <span className="vance-badge muted" style={{ fontSize: '11px' }}>
                  {item.date}
                </span>
              </div>

              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
                marginTop: '4px',
                flexShrink: 0
              }} />

              <div style={{
                flex: 1,
                backgroundColor: 'var(--bg-secondary)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ fontSize: '14px', color: 'var(--text-main)' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
