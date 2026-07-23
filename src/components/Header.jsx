import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { ChevronDown, Bell, ShieldCheck, UserCheck, LogOut } from 'lucide-react';

export default function Header() {
  const {
    project,
    currentUserRole,
    setCurrentUserRole,
    notifications,
    markAllNotificationsRead,
    setIsAuthenticated
  } = useProject();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="animate-fade-in" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '16px',
      borderBottom: '1px solid var(--border-subtle)',
      marginBottom: '20px'
    }}>
      {/* Left: Dropdown Selector in Vance Studio style */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--text-main)',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}>
          <span>Vance Studio</span>
          <ChevronDown size={16} strokeWidth={1.75} />
        </button>

        <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>/</span>

        <span className="kb-badge" style={{ fontSize: '12px' }}>
          {project.name}
        </span>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Role Switcher Button */}
        <button
          className="vance-btn sm"
          onClick={() => setCurrentUserRole(currentUserRole === 'client' ? 'admin' : 'client')}
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-main)'
          }}
          title="Alternar modo Cliente e Vance Admin"
        >
          {currentUserRole === 'admin' ? (
            <>
              <ShieldCheck size={14} strokeWidth={1.75} />
              <span>Vance Admin</span>
            </>
          ) : (
            <>
              <UserCheck size={14} strokeWidth={1.75} />
              <span>Modo Cliente</span>
            </>
          )}
        </button>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (unreadCount > 0) markAllNotificationsRead();
            }}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Bell size={18} strokeWidth={1.75} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--text-main)',
                borderRadius: '50%'
              }} />
            )}
          </button>

          {showNotifications && (
            <div className="vance-card animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '36px',
              width: '300px',
              maxHeight: '360px',
              overflowY: 'auto',
              zIndex: 100,
              padding: '16px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 500 }}>Notificações</span>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Tudo lido</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: n.unread ? 'var(--bg-card)' : 'var(--bg-sidebar)',
                    borderLeft: n.unread ? '3px solid var(--text-main)' : 'none'
                  }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-main)', marginBottom: '2px' }}>{n.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{n.desc}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-subtle)' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Circle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 500,
            border: '1px solid var(--border-input)'
          }}>
            {currentUserRole === 'admin' ? 'VG' : 'LM'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: 500 }}>
              {currentUserRole === 'admin' ? 'Equipe Vance' : project.clientName}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-subtle)' }}>
              {currentUserRole === 'admin' ? 'Gestor de Contas' : project.clientCompany}
            </span>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-subtle)',
              cursor: 'pointer',
              padding: '6px'
            }}
            title="Sair"
          >
            <LogOut size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
}
