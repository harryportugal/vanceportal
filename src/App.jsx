import React from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Checklist from './components/Checklist';
import Arquivos from './components/Arquivos';
import ProjetoOnline from './components/ProjetoOnline';
import Revisoes from './components/Revisoes';
import Pagamentos from './components/Pagamentos';
import Mensagens from './components/Mensagens';
import Suporte from './components/Suporte';
import Historico from './components/Historico';
import Perfil from './components/Perfil';
import AdminPanel from './components/AdminPanel';

function MainApp() {
  const { isAuthenticated, activeTab } = useProject();

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'timeline': return <Timeline />;
      case 'checklist': return <Checklist />;
      case 'arquivos': return <Arquivos />;
      case 'projeto-online': return <ProjetoOnline />;
      case 'revisoes': return <Revisoes />;
      case 'pagamentos': return <Pagamentos />;
      case 'mensagens': return <Mensagens />;
      case 'suporte': return <Suporte />;
      case 'historico': return <Historico />;
      case 'perfil': return <Perfil />;
      case 'admin-panel': return <AdminPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="kb-app-frame animate-fade-in">
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px', overflowY: 'auto' }}>
        <Header />
        <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <MainApp />
    </ProjectProvider>
  );
}
