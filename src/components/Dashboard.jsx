import React from 'react';
import { useProject } from '../context/ProjectContext';
import { GetStartedButton } from './ui/GetStartedButton';
import {
  Globe,
  Calendar,
  CheckSquare,
  ArrowRight,
  TrendingUp,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  ExternalLink,
  Smartphone,
  Info,
  Clock,
  Download,
  FileText,
  Check
} from 'lucide-react';

export default function Dashboard() {
  const {
    project,
    checklist,
    toggleChecklist,
    payments,
    historyLog,
    setActiveTab
  } = useProject();

  const isChecklistComplete = checklist.length > 0 && checklist.every(c => c.completed);
  const completedCount = checklist.filter(c => c.completed).length;
  const pendingCount = checklist.filter(c => !c.completed).length;
  const displayUrl = project.stagingUrl || 'https://harryportugal.com';

  const paidPercentage = payments.total > 0 ? Math.round((payments.paid / payments.total) * 100) : 0;
  const checklistPercentage = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. APPLE MINIMALIST HERO OVERVIEW CARD - CASCADE ITEM DELAY-1 */}
      <div className="vance-card vance-cascade-item delay-1" style={{
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        border: 'none',
        boxShadow: 'none'
      }}>
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="vance-badge active" style={{ padding: '4px 12px', fontSize: '11px' }}>
                {project.status}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                Atualizado: {project.lastUpdate}
              </span>
            </div>
            <h1 style={{ fontSize: '24px', margin: 0, lineHeight: 1.2, fontWeight: 500 }}>
              {project.name}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {project.clientCompany} • Contrato Ativo
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <GetStartedButton
              variant="secondary"
              icon={MessageSquare}
              onClick={() => setActiveTab('mensagens')}
            >
              Mensagens
            </GetStartedButton>

            <GetStartedButton
              variant="primary"
              icon={Globe}
              onClick={() => setActiveTab('projeto-online')}
            >
              Abrir Projeto Online
            </GetStartedButton>
          </div>
        </div>

        {/* Progress Bar Section - CLEAN APPLE MINIMALIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Progresso Geral do Desenvolvimento</span>
            <span style={{ color: 'var(--text-main)', fontSize: '13.5px', fontWeight: 500 }}>{project.progress}% Concluído</span>
          </div>

          <div style={{
            height: '6px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${project.progress}%`,
              backgroundColor: 'var(--text-main)',
              borderRadius: '9999px',
              transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
            }} />
          </div>
        </div>

        {/* Key Metrics Pill Grid - STAGGERED CASCADE DELAYS 2, 3, 4, 5 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          width: '100%'
        }}>
          {/* Card 1: Data Prevista (CASCADE DELAY-2) */}
          <div className="vance-cascade-item delay-2" style={{
            flex: '0 0 auto',
            backgroundColor: 'var(--bg-surface)',
            padding: '12px 16px',
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'none'
          }}>
            <Calendar size={18} color="var(--text-main)" strokeWidth={1.75} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Data Prevista</div>
              <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 500 }}>
                {project.targetDate}
              </div>
            </div>
          </div>

          {/* Card 2: Próxima Etapa (CASCADE DELAY-3) */}
          <div className="vance-cascade-item delay-3" style={{
            flex: '0 0 auto',
            backgroundColor: 'var(--bg-surface)',
            padding: '12px 16px',
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'none'
          }}>
            <TrendingUp size={18} color="var(--text-main)" strokeWidth={1.75} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Próxima Etapa</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-main)', fontWeight: 500 }}>
                {project.nextStep}
              </div>
            </div>
            <span style={{
              fontSize: '10.5px',
              color: 'var(--text-muted)',
              fontWeight: 400,
              backgroundColor: 'var(--bg-card)',
              padding: '4px 10px',
              borderRadius: '9999px',
              marginLeft: '4px',
              flexShrink: 0
            }}>
              Em Andamento
            </span>
          </div>

          {/* Card 3: Pendências (CASCADE DELAY-4) */}
          <div
            onClick={() => setActiveTab('checklist')}
            className="vance-cascade-item delay-4"
            style={{
              flex: '0 0 auto',
              backgroundColor: 'var(--bg-surface)',
              padding: '12px 16px',
              borderRadius: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'none',
              cursor: 'pointer'
            }}
          >
            <CheckSquare size={18} color="var(--text-main)" strokeWidth={1.75} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Pendências</div>
              <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 500 }}>
                {pendingCount > 0 ? `${pendingCount} pendente(s)` : 'Sem pendências'}
              </div>
            </div>
          </div>

          {/* 2 ANIMATED ROUND ICON-ONLY BUTTONS (CASCADE DELAY-5) */}
          <div className="vance-cascade-item delay-5" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto', flexShrink: 0 }}>
            {/* ICON BUTTON 1: CHECKLIST */}
            <button
              className="vance-icon-btn"
              onClick={() => setActiveTab('checklist')}
              title="Ir para Checklist"
            >
              <CheckSquare size={18} strokeWidth={1.75} />
            </button>

            {/* ICON BUTTON 2: OFFICIAL WHATSAPP SVG LOGO */}
            <button
              className="vance-icon-btn"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              title="Atendimento via WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none">
                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M18.403 5.586A9.78 9.78 0 0 0 11.47 2.7c-5.412 0-9.814 4.402-9.817 9.816a9.78 9.78 0 0 0 1.312 4.908L1.7 22.3l5.048-1.324a9.79 9.79 0 0 0 4.72 1.218h.004c5.411 0 9.814-4.402 9.817-9.816.001-2.623-1.02-5.088-2.886-6.952zm-6.933 15.027h-.003a8.16 8.16 0 0 1-4.16-1.135l-.298-.177-3.09.81.824-3.013-.195-.31a8.16 8.16 0 0 1-1.25-4.398c.003-4.507 3.67-8.174 8.18-8.174 2.183 0 4.236.85 5.778 2.393a8.12 8.12 0 0 1 2.39 5.78c-.003 4.508-3.67 8.175-8.176 8.175zm4.484-6.13c-.246-.123-1.457-.719-1.683-.801-.226-.082-.391-.123-.555.123-.165.247-.638.801-.782.966-.144.165-.288.185-.534.062-.246-.123-1.04-.383-1.982-1.223-.733-.654-1.228-1.463-1.372-1.71-.144-.247-.015-.38.109-.503.111-.11.246-.288.37-.432.123-.144.164-.247.246-.412.082-.165.041-.309-.02-.432-.062-.124-.556-1.337-.762-1.831-.2-.482-.403-.417-.555-.425l-.473-.008c-.164 0-.432.062-.658.309s-.864.844-.864 2.06 0 2.39 1.07 3.83c1.07 1.44 2.508 2.2 3.6 2.668.784.336 1.498.288 2.062.204.629-.094 1.933-.79 2.201-1.551.267-.76.267-1.41.185-1.551-.082-.141-.246-.223-.492-.346z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 2. GRID DUPLO: CHECKLIST DO CLIENTE + HOMOLOGAÇÃO (CASCADE DELAYS 6, 7) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
        
        {/* CHECKLIST CARD (CASCADE DELAY-6) */}
        <div className="vance-card vance-cascade-item delay-6" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '24px',
          boxShadow: 'none'
        }}>
          {/* Header Row with Progress Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare size={17} color="var(--text-main)" strokeWidth={1.75} />
              <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 500 }}>Checklist do Cliente</h2>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface)', padding: '4px 10px', borderRadius: '9999px', fontWeight: 500 }}>
              {completedCount} de {checklist.length} concluídos
            </span>
          </div>

          {/* Micro Progress Bar inside Card */}
          <div style={{ height: '4px', backgroundColor: 'var(--bg-surface)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${checklistPercentage}%`,
              backgroundColor: 'var(--text-main)',
              borderRadius: '9999px',
              transition: 'width 0.4s ease'
            }} />
          </div>

          {/* Compact Items List */}
          {isChecklistComplete ? (
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '24px 16px',
              borderRadius: '16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={24} color="var(--text-main)" strokeWidth={1.75} />
              <span style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                Você concluiu todas as pendências.
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                Nossa equipe está trabalhando a todo vapor no seu projeto.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {checklist.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`vance-cascade-item delay-${idx + 1}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* CUSTOM STYLED CHECKBOX ICON */}
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '5px',
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: item.completed ? 'var(--text-main)' : 'transparent',
                      border: item.completed ? 'none' : '1.5px solid var(--text-subtle)',
                      color: 'var(--text-inv)',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}>
                      {item.completed && <Check size={12} strokeWidth={3} />}
                    </div>

                    <span style={{
                      fontSize: '12px',
                      color: item.completed ? 'var(--text-subtle)' : 'var(--text-main)',
                      textDecoration: item.completed ? 'line-through' : 'none',
                      lineHeight: 1.3
                    }}>
                      {item.title}
                    </span>
                  </div>

                  <span className="vance-badge muted" style={{ fontSize: '9.5px', flexShrink: 0, padding: '2px 8px' }}>
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* HOMOLOGAÇÃO PREVIEW CARD (CASCADE DELAY-7) */}
        <div className="vance-card vance-cascade-item delay-7" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '24px',
          boxShadow: 'none'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} color="var(--text-main)" strokeWidth={1.75} />
                <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 500 }}>Ambiente de Homologação</h2>
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
              Acompanhe o desenvolvimento do projeto em tempo real antes da publicação final.
            </p>

            {/* STAGING URL CONTAINER */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '12px 16px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                Link de Testes & Staging
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 500, wordBreak: 'break-all' }}>
                {displayUrl}
              </div>
            </div>

            {/* REAL TECHNICAL NOTES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '10px 14px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <Smartphone size={15} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} strokeWidth={1.75} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-main)' }}>
                    Visualização Mobile
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                    Versão Desktop ativa. Ajustes finos de responsividade mobile serão finalizados na etapa final do projeto.
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '10px 14px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <Info size={15} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} strokeWidth={1.75} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-main)' }}>
                    Sincronização Automática
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                    As alterações são sincronizadas com o servidor de homologação a cada atualização do projeto.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COMPACT PROPORTIONAL BUTTONS */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: 'auto' }}>
            <GetStartedButton
              variant="primary"
              icon={Globe}
              onClick={() => setActiveTab('projeto-online')}
            >
              Visualizar no Portal
            </GetStartedButton>

            <GetStartedButton
              as="a"
              href={displayUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              icon={ExternalLink}
            >
              Abrir Externa
            </GetStartedButton>
          </div>
        </div>
      </div>

      {/* 3. FINANCIAL & RECENT ACTIVITIES - (CASCADE DELAYS 8, 9) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
        
        {/* FINANCIAL SUMMARY CARD (CASCADE DELAY-8) */}
        <div className="vance-card vance-cascade-item delay-8" style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'none'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={16} color="var(--text-main)" strokeWidth={1.75} />
              <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 500 }}>Resumo Financeiro</h2>
            </div>
            <button
              onClick={() => setActiveTab('pagamentos')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer' }}
            >
              Ver tudo
            </button>
          </div>

          {/* 1. METRICS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Valor Pago</div>
              <div style={{ fontSize: '16px', color: 'var(--text-main)', marginTop: '2px', fontWeight: 500 }}>
                R$ {payments.paid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Valor Pendente</div>
              <div style={{ fontSize: '16px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 500 }}>
                R$ {payments.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* 2. FINANCIAL PROGRESS BAR */}
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: 'var(--text-subtle)' }}>Quitação do Contrato</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{paidPercentage}% Quitados</span>
            </div>
            <div style={{ height: '4px', backgroundColor: 'var(--bg-card)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${paidPercentage}%`, backgroundColor: 'var(--text-main)', borderRadius: '9999px' }} />
            </div>
          </div>

          {/* 3. NEXT DUE DATE NOTICE */}
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '10px 14px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} strokeWidth={1.75} />
            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-main)', fontWeight: 500 }}>
                Próximo Vencimento: {payments.nextDueDate}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-subtle)' }}>
                Parcela final de R$ {payments.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* 4. BALANCED 3-BUTTON CTA ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginTop: 'auto' }}>
            <GetStartedButton
              variant="primary"
              icon={ChevronRight}
              onClick={() => setActiveTab('pagamentos')}
              style={{ minWidth: 0, padding: '8px 12px 8px 14px', fontSize: '12px' }}
            >
              Pagamentos
            </GetStartedButton>

            <GetStartedButton
              variant="secondary"
              icon={Download}
              onClick={() => setActiveTab('pagamentos')}
              style={{ minWidth: 0, padding: '8px 12px 8px 14px', fontSize: '12px' }}
            >
              Faturas & PIX
            </GetStartedButton>

            <GetStartedButton
              variant="secondary"
              icon={FileText}
              onClick={() => setActiveTab('pagamentos')}
              style={{ minWidth: 0, padding: '8px 12px 8px 14px', fontSize: '12px' }}
            >
              Solicitar NF-e
            </GetStartedButton>
          </div>
        </div>

        {/* LATEST HISTORY LOG (CASCADE DELAY-9) */}
        <div className="vance-card vance-cascade-item delay-9" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', boxShadow: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 500 }}>Últimas Atividades</h2>
            <button
              onClick={() => setActiveTab('historico')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer' }}
            >
              Histórico completo
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {historyLog.slice(0, 3).map(h => (
              <div key={h.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span className="vance-badge muted" style={{ fontSize: '10px', flexShrink: 0 }}>
                  {h.date}
                </span>
                <div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-main)' }}>{h.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
