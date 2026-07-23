import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import {
  Box,
  Home,
  GitCommit,
  CheckSquare,
  FolderDown,
  Globe,
  GitPullRequest,
  CreditCard,
  MessageSquare,
  LifeBuoy,
  History,
  User,
  ShieldAlert,
  Search,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Folder,
  Sun,
  Moon,
  Zap,
  Activity,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, checklist, payments, project, notifications } = useProject();
  const [sidebarTab, setSidebarTab] = useState('Módulos'); // 'Módulos' or 'Status'
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pendingChecklist = checklist.filter(c => !c.completed).length;
  const unreadNotifications = notifications.filter(n => n.unread).length;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'timeline', label: 'Timeline', icon: GitCommit },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare, badge: pendingChecklist > 0 ? pendingChecklist : null },
    { id: 'arquivos', label: 'Arquivos', icon: FolderDown },
    { id: 'projeto-online', label: 'Projeto Online', icon: Globe },
    { id: 'revisoes', label: 'Revisões', icon: GitPullRequest },
    { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard, badge: payments.pending > 0 ? 'R$' : null },
    { id: 'mensagens', label: 'Mensagens', icon: MessageSquare, badge: unreadNotifications > 0 ? unreadNotifications : null },
    { id: 'suporte', label: 'Suporte', icon: LifeBuoy },
    { id: 'historico', label: 'Histórico', icon: History },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  const filteredNavItems = mainNavItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusItems = [
    { id: 'dashboard', label: 'Progresso do Projeto', detail: `${project.progress}% Concluído`, icon: Activity, tag: 'Geral' },
    { id: 'checklist', label: 'Pendências do Cliente', detail: pendingChecklist > 0 ? `${pendingChecklist} pendente(s)` : 'Tudo concluído', icon: CheckSquare, tag: pendingChecklist > 0 ? 'Ação' : 'OK' },
    { id: 'pagamentos', label: 'Financeiro / Fatura', detail: payments.pending > 0 ? `R$ ${payments.pending.toLocaleString('pt-BR')} pendente` : 'Quitado', icon: CreditCard, tag: 'Financeiro' },
    { id: 'projeto-online', label: 'Homologação Ao Vivo', detail: 'URL Online', icon: Globe, tag: 'Staging' },
    { id: 'mensagens', label: 'Atendimento Direto', detail: 'Equipe Online', icon: MessageSquare, tag: 'Chat' },
  ];

  return (
    <>
      {/* 1. LEFTMOST ICON RAIL (56px) - PROMINENT CRISP LOGO */}
      <aside className="kb-rail">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}>
          <div className="kb-rail-logo" title="Vance Studio" style={{ width: '44px', height: '44px', display: 'grid', placeItems: 'center' }}>
            <img
              src="/logo vance 2.png"
              alt="Vance Studio"
              style={{ width: '42px', height: '42px', objectFit: 'contain' }}
            />
          </div>

          {/* TOGGLE EXPAND BUTTON WHEN COLLAPSED */}
          {isCollapsed && (
            <button
              className="kb-rail-item active"
              onClick={() => setIsCollapsed(false)}
              title="Expandir Menu Lateral"
              style={{ backgroundColor: 'var(--text-main)', color: 'var(--text-inv)' }}
            >
              <PanelLeftOpen size={18} strokeWidth={1.75} />
            </button>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', marginTop: '6px' }}>
            <button
              className={`kb-rail-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              title="Dashboard"
            >
              <Home size={18} strokeWidth={1.75} />
            </button>

            <button
              className={`kb-rail-item ${activeTab === 'arquivos' ? 'active' : ''}`}
              onClick={() => setActiveTab('arquivos')}
              title="Arquivos"
            >
              <FolderDown size={18} strokeWidth={1.75} />
            </button>

            <button
              className={`kb-rail-item ${activeTab === 'pagamentos' ? 'active' : ''}`}
              onClick={() => setActiveTab('pagamentos')}
              title="Pagamentos"
            >
              <CreditCard size={18} strokeWidth={1.75} />
            </button>

            <button
              className={`kb-rail-item ${activeTab === 'admin-panel' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin-panel')}
              title="Painel Admin"
            >
              <ShieldAlert size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Theme switcher toggle inside rail bottom */}
        <div style={{ marginTop: 'auto' }}>
          <button className="kb-rail-item" onClick={toggleTheme} title="Alternar Tema Claro/Escuro">
            {theme === 'light' ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </aside>

      {/* 2. SECONDARY SIDEBAR TREE VIEW (256px) - CLEAN HEADER WITHOUT DUPLICATE LOGO */}
      {!isCollapsed && (
        <aside className="kb-sidebar-tree animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <span style={{ fontSize: '15.5px', fontWeight: 500, color: 'var(--text-main)' }}>Vance Studio</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="vance-icon-btn"
                style={{ width: '28px', height: '28px' }}
                onClick={() => setIsCollapsed(true)}
                title="Recolher Menu (Ocultar Sidebar)"
              >
                <PanelLeftClose size={14} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Search input */}
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-subtle)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="vance-input"
              placeholder="Buscar no portal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '12px' }}
            />
          </div>

          {/* FUNCTIONAL TAB SWITCHER: MÓDULOS | STATUS */}
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-active-pill)', padding: '3px', borderRadius: 'var(--radius-pill)' }}>
            <button
              onClick={() => setSidebarTab('Módulos')}
              style={{
                flex: 1,
                padding: '6px 10px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: sidebarTab === 'Módulos' ? 'var(--bg-surface)' : 'transparent',
                color: sidebarTab === 'Módulos' ? 'var(--text-main)' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              Módulos
            </button>

            <button
              onClick={() => setSidebarTab('Status')}
              style={{
                flex: 1,
                padding: '6px 10px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: sidebarTab === 'Status' ? 'var(--bg-surface)' : 'transparent',
                color: sidebarTab === 'Status' ? 'var(--text-main)' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              Status
            </button>
          </div>

          {/* RENDER BASED ON ACTIVE FUNCTIONAL TAB */}
          {sidebarTab === 'Módulos' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
              {/* Category Folder Header - Non-selectable title */}
              <div className="kb-tree-node" style={{ cursor: 'default' }}>
                <div className="kb-node-left">
                  <Folder size={15} strokeWidth={1.75} color="var(--text-muted)" />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Navegação Principal</span>
                </div>
                <span className="kb-badge">11</span>
              </div>

              {/* Subtree Level 1 */}
              <div className="kb-sub-tree">
                {filteredNavItems.map(item => (
                  <div
                    key={item.id}
                    className={`kb-tree-node ${activeTab === item.id ? 'selected' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <div className="kb-node-left">
                      <Folder size={14} strokeWidth={1.75} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && <span className="kb-badge">{item.badge}</span>}
                  </div>
                ))}
              </div>

              <div
                className={`kb-tree-node ${activeTab === 'admin-panel' ? 'selected' : ''}`}
                onClick={() => setActiveTab('admin-panel')}
                style={{ marginTop: '10px' }}
              >
                <div className="kb-node-left">
                  <ShieldAlert size={14} strokeWidth={1.75} />
                  <span>Painel Admin</span>
                </div>
              </div>
            </div>
          ) : (
            /* REAL-TIME FUNCTIONAL STATUS ATALHOS PANEL */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)', padding: '0 4px' }}>
                Resumo de Monitoramento
              </div>

              {statusItems.map(st => {
                const IconComp = st.icon;
                return (
                  <div
                    key={st.id}
                    onClick={() => setActiveTab(st.id)}
                    style={{
                      backgroundColor: activeTab === st.id ? 'var(--bg-active-pill)' : 'var(--bg-card)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-main)', fontWeight: 500 }}>
                        <IconComp size={14} strokeWidth={1.75} color="var(--text-muted)" />
                        <span>{st.label}</span>
                      </div>
                      <span className="vance-badge active" style={{ fontSize: '9.5px', padding: '2px 6px' }}>
                        {st.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', paddingLeft: '20px' }}>
                      {st.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </aside>
      )}
    </>
  );
}
