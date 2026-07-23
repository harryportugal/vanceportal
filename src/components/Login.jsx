import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const { setIsAuthenticated, setCurrentUserRole } = useProject();
  const [email, setEmail] = useState('lucas@clinicaalpha.com.br');
  const [password, setPassword] = useState('••••••••••••');
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [selectedRole, setSelectedRole] = useState('client');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useMagicLink) {
      setMagicLinkSent(true);
      setTimeout(() => {
        setCurrentUserRole(selectedRole);
        setIsAuthenticated(true);
      }, 1500);
    } else {
      setCurrentUserRole(selectedRole);
      setIsAuthenticated(true);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)',
      padding: '20px'
    }}>
      <div className="vance-card animate-fade-in" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '36px 32px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="/logo vance 2.png"
            alt="Vance Studio Logo"
            style={{
              height: '44px',
              width: 'auto',
              objectFit: 'contain',
              margin: '0 auto 12px',
              display: 'block'
            }}
          />
          <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '4px', fontWeight: 500 }}>
            Vance Studio
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Área Exclusiva do Cliente
          </p>
        </div>

        {/* Role Quick Selector for Demo */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => setSelectedRole('client')}
            style={{
              flex: 1,
              padding: '6px 12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              cursor: 'pointer',
              backgroundColor: selectedRole === 'client' ? 'var(--bg-card)' : 'transparent',
              color: selectedRole === 'client' ? 'var(--text-main)' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            Acesso Cliente
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            style={{
              flex: 1,
              padding: '6px 12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              cursor: 'pointer',
              backgroundColor: selectedRole === 'admin' ? 'var(--bg-card)' : 'transparent',
              color: selectedRole === 'admin' ? 'var(--text-main)' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            Painel Vance (Admin)
          </button>
        </div>

        {magicLinkSent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={40} color="var(--text-main)" style={{ margin: '0 auto 14px' }} strokeWidth={1.75} />
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Link mágico enviado</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Enviamos um link de acesso direto para <strong>{email}</strong>. Redirecionando...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Email corporativo
              </label>
              <input
                type="email"
                className="vance-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@empresa.com"
                required
              />
            </div>

            {!useMagicLink && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Senha
                </label>
                <input
                  type="password"
                  className="vance-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>
            )}

            <button type="submit" className="vance-btn primary lg" style={{ marginTop: '8px', width: '100%' }}>
              {useMagicLink ? 'Enviar Link Mágico' : 'Entrar na Plataforma'}
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setUseMagicLink(!useMagicLink)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={14} color="var(--text-muted)" strokeWidth={1.75} />
                {useMagicLink ? 'Entrar usando senha tradicional' : 'Entrar via Link Mágico por email'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
