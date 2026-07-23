import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { User, Building, Phone, Mail, Lock, Bell, CheckCircle2, Save } from 'lucide-react';

export default function Perfil() {
  const { project, updateProjectData } = useProject();

  const [name, setName] = useState(project.clientName);
  const [company, setCompany] = useState(project.clientCompany);
  const [email, setEmail] = useState(project.clientEmail);
  const [phone, setPhone] = useState(project.clientPhone);
  const [password, setPassword] = useState('••••••••••••');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProjectData({
      clientName: name,
      clientCompany: company,
      clientEmail: email,
      clientPhone: phone
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER CARD */}
      <div className="vance-card" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Perfil do Cliente</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Gerencie seus dados cadastrais, informações de contato da empresa e preferências de notificação.
        </p>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSave} className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '28px' }}>
        
        {savedSuccess && (
          <div style={{
            backgroundColor: 'var(--emerald-soft)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            color: '#6EE7B7',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <CheckCircle2 size={16} />
            <span>Dados salvos com sucesso!</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Nome do Responsável
            </label>
            <input
              type="text"
              className="vance-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Nome da Empresa / Clínica
            </label>
            <input
              type="text"
              className="vance-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Email Corporativo
            </label>
            <input
              type="email"
              className="vance-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Telefone / WhatsApp
            </label>
            <input
              type="text"
              className="vance-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.02)' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Segurança & Acesso</h4>
          <div style={{ maxWidth: '320px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Nova Senha (deixe em branco para manter a atual)
            </label>
            <input
              type="password"
              className="vance-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.02)' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Preferências de Notificação</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
              Receber alertas por email quando houver atualização de progresso
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
              Notificar quando novas mensagens forem recebidas
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
              Lembretes automáticos de vencimento de faturas
            </label>
          </div>
        </div>

        <div>
          <button type="submit" className="vance-btn primary">
            <Save size={16} />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
