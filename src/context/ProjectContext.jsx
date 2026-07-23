import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('vance_auth') === 'true';
  });

  const [currentUserRole, setCurrentUserRole] = useState('client'); // 'client' | 'admin'
  const [activeTab, setActiveTab] = useState('dashboard');

  // PROJECT CORE METRICS & BRANDING - DEFAULT HARRYPORTUGAL.COM / PORTFOLIO
  const [project, setProject] = useState(() => {
    const saved = localStorage.getItem('vance_project');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'proj-001',
      name: 'Website Portfolio — Harry Portugal',
      clientCompany: 'Harry Portugal Studio',
      clientName: 'Harry Portugal',
      clientEmail: 'contato@harryportugal.com',
      status: 'Desenvolvimento',
      progress: 72,
      lastUpdate: 'Hoje às 11:20 pela Vance Studio',
      targetDate: '15/08/2026',
      nextStep: 'Integração de animações & otimização de performance',
      stagingUrl: 'https://harryportugal.com'
    };
  });

  // TIMELINE STAGES
  const [timeline, setTimeline] = useState(() => {
    const saved = localStorage.getItem('vance_timeline');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Briefing & Alinhamento', status: 'completed', date: '01/07/2026', responsible: 'Vance Studio Team', notes: 'Briefing estratégico aprovado.' },
      { id: 2, title: 'Pesquisa & Arquitetura', status: 'completed', date: '05/07/2026', responsible: 'UX Designer', notes: 'Estrutura e sitemap mapeados.' },
      { id: 3, title: 'Wireframes Interativos', status: 'completed', date: '10/07/2026', responsible: 'UI Designer', notes: 'Wireframes aprovados pelo cliente.' },
      { id: 4, title: 'Design & Prototipagem', status: 'completed', date: '18/07/2026', responsible: 'UI Team', notes: 'Protótipo de alta fidelidade finalizado.' },
      { id: 5, title: 'Desenvolvimento Frontend & React', status: 'current', date: 'Em andamento', responsible: 'Frontend Engineer', notes: 'Desenvolvimento em 72% de progresso.' },
      { id: 6, title: 'Revisão & Testes de Homologação', status: 'pending', date: 'Previsto: 10/08/2026', responsible: 'QA Lead & Cliente', notes: 'Validação final de responsividade.' },
      { id: 7, title: 'Publicação & Go-Live', status: 'pending', date: 'Previsto: 15/08/2026', responsible: 'DevOps Lead', notes: 'Lançamento oficial no domínio principal.' }
    ];
  });

  // CLEAN PROFESSIONAL CHECKLIST ITEMS
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('vance_checklist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Enviar logotipo vetorizado (SVG ou EPS)', completed: true, category: 'Logos' },
      { id: 2, title: 'Enviar biografia e textos institucionais', completed: true, category: 'Textos' },
      { id: 3, title: 'Enviar fotos em alta resolução dos projetos', completed: true, category: 'Imagens' },
      { id: 4, title: 'Aprovar guia de estilo e paleta de cores', completed: true, category: 'Design' },
      { id: 5, title: 'Fornecer credenciais de acesso ao servidor/domínio', completed: false, category: 'Publicação' },
      { id: 6, title: 'Aprovar testes de responsividade em staging', completed: false, category: 'Geral' },
      { id: 7, title: 'Quitação da parcela final', completed: false, category: 'Financeiro' }
    ];
  });

  // FILES
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('vance_files');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Logo_HarryPortugal_Vetor.svg', size: '1.2 MB', category: 'Logos', uploader: 'Harry Portugal', date: '02/07/2026' },
      { id: 2, name: 'Textos_Biografia_Projetos.docx', size: '480 KB', category: 'Textos', uploader: 'Harry Portugal', date: '04/07/2026' },
      { id: 3, name: 'Fotos_Portfolio_AltaRes.zip', size: '42.5 MB', category: 'Imagens', uploader: 'Harry Portugal', date: '08/07/2026' },
      { id: 4, name: 'Manual_Branding_Vance.pdf', size: '3.8 MB', category: 'Documentos', uploader: 'Vance Studio', date: '12/07/2026' },
      { id: 5, name: 'Contrato_Prestacao_Servicos.pdf', size: '1.1 MB', category: 'Contrato', uploader: 'Vance Studio', date: '01/07/2026' }
    ];
  });

  // REVISION REQUESTS
  const [revisions, setRevisions] = useState(() => {
    const saved = localStorage.getItem('vance_revisions');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Ajuste de margem no header mobile', desc: 'Ajustar padding superior no menu mobile.', status: 'Concluída', requestedAt: '12/07/2026', completedAt: '13/07/2026' },
      { id: 2, title: 'Alteração da ordem das galerias', desc: 'Mover a galeria de destaques para cima do formulário.', status: 'Em desenvolvimento', requestedAt: '20/07/2026', completedAt: '-' }
    ];
  });

  // PAYMENTS
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('vance_payments');
    return saved ? JSON.parse(saved) : {
      total: 8500,
      paid: 6000,
      pending: 2500,
      nextDueDate: '10/08/2026',
      history: [
        { id: 'inv-01', title: 'Entrada / Sinal (40%)', amount: 3400, status: 'Pago', dueDate: '01/07/2026', paidAt: '01/07/2026' },
        { id: 'inv-02', title: 'Parcela Intermediária - Aprovação Design (30%)', amount: 2600, status: 'Pago', dueDate: '20/07/2026', paidAt: '19/07/2026' },
        { id: 'inv-03', title: 'Quitação Final - Entrega & Go-Live (30%)', amount: 2500, status: 'Pendente', dueDate: '10/08/2026', paidAt: '-' }
      ]
    };
  });

  // MESSAGES
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('vance_messages');
    return saved ? JSON.parse(saved) : [
      { id: 1, sender: 'Vance Studio', avatar: 'VG', role: 'agency', text: 'Olá Harry! Seja bem-vindo ao seu portal exclusivo da Vance Studio. Qualquer dúvida, estamos por aqui!', time: '10/07 às 10:00' },
      { id: 2, sender: 'Harry Portugal', avatar: 'HP', role: 'client', text: 'Excelente! Adorei a organização da plataforma. Enviei os arquivos pelo menu Arquivos.', time: '14/07 às 14:20' },
      { id: 3, sender: 'Gabriel (Designer)', avatar: 'VG', role: 'agency', text: 'Fotos e materiais recebidos com sucesso! Já aplicamos no projeto do seu portfólio.', time: '15/07 às 09:15' },
      { id: 4, sender: 'Lucas (Fullstack)', avatar: 'VG', role: 'agency', text: 'O projeto já está 72% concluído! Acompanhe o site ao vivo em harryportugal.com no portal.', time: 'Hoje às 09:30' }
    ];
  });

  // HISTORY AUDIT LOG
  const [historyLog, setHistoryLog] = useState(() => {
    const saved = localStorage.getItem('vance_history');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Publicação em Staging', desc: 'Versão v0.7.2 disponibilizada em harryportugal.com', date: 'Hoje às 09:30' },
      { id: 2, title: 'Confirmação de Pagamento', desc: 'Parcela intermediária de R$ 2.600,00 quitada.', date: '19/07/2026' },
      { id: 3, title: 'Conclusão da Etapa de Design', desc: 'Protótipos de interface aprovados.', date: '18/07/2026' },
      { id: 4, title: 'Upload de Arquivos', desc: 'Harry enviou Fotos_Portfolio_AltaRes.zip', date: '08/07/2026' }
    ];
  });

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nova atualização de progresso', desc: 'O desenvolvimento do seu portfólio atingiu 72%.', time: '10 min atrás', unread: true },
    { id: 2, title: 'Aviso de vencimento', desc: 'A última parcela vence em 10/08/2026.', time: '1 hora atrás', unread: true }
  ]);

  // LOCAL STORAGE SAVE EFFECTS
  useEffect(() => { localStorage.setItem('vance_auth', isAuthenticated); }, [isAuthenticated]);
  useEffect(() => { localStorage.setItem('vance_project', JSON.stringify(project)); }, [project]);
  useEffect(() => { localStorage.setItem('vance_timeline', JSON.stringify(timeline)); }, [timeline]);
  useEffect(() => { localStorage.setItem('vance_checklist', JSON.stringify(checklist)); }, [checklist]);
  useEffect(() => { localStorage.setItem('vance_files', JSON.stringify(files)); }, [files]);
  useEffect(() => { localStorage.setItem('vance_revisions', JSON.stringify(revisions)); }, [revisions]);
  useEffect(() => { localStorage.setItem('vance_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('vance_messages', JSON.stringify(messages)); }, [messages]);

  // ACTIONS
  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    addHistoryLog('Atualização no Checklist', `Item #${id} alterado pelo cliente.`);
  };

  const uploadFile = (fileObj) => {
    const newFile = {
      id: Date.now(),
      name: fileObj.name,
      size: `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB`,
      category: fileObj.category || 'Geral',
      uploader: currentUserRole === 'admin' ? 'Vance Studio' : project.clientName,
      date: new Date().toLocaleDateString('pt-BR')
    };
    setFiles(prev => [newFile, ...prev]);
    addHistoryLog('Novo Arquivo Enviado', `${newFile.name} (${newFile.category}) enviado.`);
  };

  const addRevision = (title, desc) => {
    const newRev = {
      id: Date.now(),
      title,
      desc,
      status: 'Em análise',
      requestedAt: new Date().toLocaleDateString('pt-BR'),
      completedAt: '-'
    };
    setRevisions(prev => [newRev, ...prev]);
    addHistoryLog('Solicitação de Revisão', `Revisão: "${title}" cadastrada.`);
  };

  const payInvoice = (invoiceId) => {
    setPayments(prev => {
      const updatedHistory = prev.history.map(inv => {
        if (inv.id === invoiceId) {
          return { ...inv, status: 'Pago', paidAt: new Date().toLocaleDateString('pt-BR') };
        }
        return inv;
      });

      const paidTotal = updatedHistory.filter(i => i.status === 'Pago').reduce((acc, curr) => acc + curr.amount, 0);
      const pendingTotal = prev.total - paidTotal;

      return {
        ...prev,
        paid: paidTotal,
        pending: pendingTotal,
        history: updatedHistory
      };
    });

    addHistoryLog('Pagamento Recebido', `Fatura #${invoiceId} quitada com sucesso.`);
  };

  const sendMessage = (textStr) => {
    const newMsg = {
      id: Date.now(),
      sender: currentUserRole === 'admin' ? 'Atendimento Vance' : project.clientName,
      avatar: currentUserRole === 'admin' ? 'VG' : 'HP',
      role: currentUserRole === 'admin' ? 'agency' : 'client',
      text: textStr,
      time: 'Agora'
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addHistoryLog = (title, desc) => {
    setHistoryLog(prev => [
      { id: Date.now(), title, desc, date: 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
      ...prev
    ]);
  };

  const updateProjectProgress = (newProgress, newStatus) => {
    setProject(prev => ({
      ...prev,
      progress: newProgress,
      status: newStatus || prev.status,
      lastUpdate: 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' pela Vance Studio'
    }));
    addHistoryLog('Progresso Atualizado', `Progresso alterado para ${newProgress}%.`);
  };

  const updateStagingUrl = (newUrl) => {
    let formatted = newUrl.trim();
    if (formatted && !formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    setProject(prev => ({
      ...prev,
      stagingUrl: formatted,
      lastUpdate: 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' pela Vance Studio'
    }));
    addHistoryLog('URL de Homologação Atualizada', `Nova URL configurada pelo Admin: ${formatted}`);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <ProjectContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      currentUserRole,
      setCurrentUserRole,
      activeTab,
      setActiveTab,
      project,
      timeline,
      checklist,
      toggleChecklist,
      files,
      uploadFile,
      revisions,
      addRevision,
      payments,
      payInvoice,
      messages,
      sendMessage,
      historyLog,
      notifications,
      markAllNotificationsRead,
      updateProjectProgress,
      updateStagingUrl
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
