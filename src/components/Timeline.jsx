import React from 'react';
import { useProject } from '../context/ProjectContext';
import { CheckCircle2, Clock, Circle, UserCheck, FileText, Calendar } from 'lucide-react';

export default function Timeline() {
  const { timeline } = useProject();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="vance-card" style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>Timeline do Projeto</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Acompanhe o andamento detalhado de cada fase da esteira de produção.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {timeline.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isPending = step.status === 'pending';

          return (
            <div
              key={step.id}
              className="vance-card"
              style={{
                backgroundColor: isCurrent ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                borderLeft: isCurrent ? '3px solid var(--text-main)' : isCompleted ? '3px solid var(--text-muted)' : '3px solid transparent',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                padding: '20px 24px'
              }}
            >
              {/* Icon Status */}
              <div style={{ marginTop: '2px' }}>
                {isCompleted && <CheckCircle2 size={20} color="var(--text-main)" strokeWidth={1.75} />}
                {isCurrent && <Clock size={20} color="var(--text-main)" strokeWidth={1.75} />}
                {isPending && <Circle size={20} color="var(--text-subtle)" strokeWidth={1.75} />}
              </div>

              {/* Step details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ fontSize: '18px', color: 'var(--text-main)', margin: 0 }}>
                      Etapa {index + 1}: <strong>{step.title}</strong>
                    </h2>
                    <span className={`vance-badge ${isCompleted || isCurrent ? 'active' : 'muted'}`}>
                      {isCompleted ? 'Concluído' : isCurrent ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <Calendar size={14} color="var(--text-subtle)" strokeWidth={1.75} />
                    <strong>{step.date}</strong>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginTop: '14px',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--mono-border)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <UserCheck size={12} strokeWidth={1.75} /> Responsável
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                      <strong>{step.responsible}</strong>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FileText size={12} strokeWidth={1.75} /> Observações
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {step.notes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
