import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { ShieldCheck, TrendingUp, Globe, CheckCircle2, Save, Link, ArrowRight } from 'lucide-react';

export default function AdminPanel() {
  const { project, updateProjectProgress, updateStagingUrl } = useProject();
  const [progressVal, setProgressVal] = useState(project.progress);
  const [statusVal, setStatusVal] = useState(project.status);
  const [stagingUrlInput, setStagingUrlInput] = useState(project.stagingUrl || 'https://harryportugal.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProgress = (e) => {
    e.preventDefault();
    updateProjectProgress(Number(progressVal), statusVal);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSaveStagingUrl = (e) => {
    e.preventDefault();
    updateStagingUrl(stagingUrlInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER CARD */}
      <div className="vance-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <ShieldCheck size={20} color="var(--text-main)" strokeWidth={1.75} />
          <h1 style={{ fontSize: '24px', margin: 0 }}>Painel de Controle Vance Studio (Admin)</h1>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Gestão centralizada do progresso do projeto, homologação ao vivo e entregáveis do cliente.
        </p>
      </div>

      {/* FEEDBACK BANNER */}
      {savedSuccess && (
        <div className="animate-fade-in" style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-main)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} strokeWidth={1.75} />
          <span>Alterações salvas com sucesso! As atualizações já estão visíveis para o cliente.</span>
        </div>
      )}

      {/* GRID DUPLO: GESTÃO DE PROGRESSO + STAGING URL ADMIN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* 1. CONTROLE DE PROGRESSO % */}
        <div className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--text-main)" strokeWidth={1.75} />
            <h2 style={{ fontSize: '18px', margin: 0 }}>Atualizar Progresso %</h2>
          </div>

          <form onSubmit={handleSaveProgress} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '6px' }}>
                Progresso atual: <strong>{progressVal}%</strong>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progressVal}
                onChange={(e) => setProgressVal(e.target.value)}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '6px' }}>
                Status do projeto
              </label>
              <select
                className="vance-select"
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value)}
              >
                <option value="Briefing">Briefing</option>
                <option value="Design">Design</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Revisão">Revisão</option>
                <option value="Publicado">Publicado</option>
              </select>
            </div>

            <button type="submit" className="vance-btn primary">
              <Save size={14} strokeWidth={1.75} />
              <span>Salvar Progresso</span>
            </button>
          </form>
        </div>

        {/* 2. ADMIN STAGING URL CONFIGURATION */}
        <div className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--text-main)" strokeWidth={1.75} />
            <h2 style={{ fontSize: '18px', margin: 0 }}>URL de Homologação (Preview)</h2>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Insira o link oficial de staging/homologação para carregar no portal do cliente.
          </p>

          <form onSubmit={handleSaveStagingUrl} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '6px' }}>
                Link de homologação do projeto
              </label>
              <div style={{ position: 'relative' }}>
                <Link size={14} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="vance-input"
                  placeholder="https://harryportugal.com"
                  value={stagingUrlInput}
                  onChange={(e) => setStagingUrlInput(e.target.value)}
                  style={{ paddingLeft: '34px', fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
            </div>

            <button type="submit" className="vance-btn primary">
              <Save size={14} strokeWidth={1.75} />
              <span>Atualizar URL de Preview</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
