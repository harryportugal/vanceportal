import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { Send, Paperclip } from 'lucide-react';

export default function Mensagens() {
  const { messages, sendMessage, currentUserRole, project } = useProject();
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  const handleSimulatedAttachment = () => {
    const attachName = `Documento_Anexo_${Math.floor(Math.random() * 900 + 100)}.pdf`;
    sendMessage(`[Arquivo Anexado: ${attachName}]`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: 'calc(100vh - 150px)',
      minHeight: '580px'
    }}>
      {/* 1. SEPARATE TOP HEADER CARD WITH CASCADE DELAY-1 */}
      <div className="vance-card vance-cascade-item delay-1" style={{
        padding: '16px 24px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        boxShadow: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 500
          }}>
            VG
          </div>
          <div>
            <h2 style={{ fontSize: '15px', margin: 0, lineHeight: 1.2, fontWeight: 500 }}>
              Canal Direto Vance Studio
            </h2>
            <div style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-main)' }} />
              <span>Equipe Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CHAT STREAM CONTAINER WITH SOLID CONTRAST BACKGROUND (CASCADE DELAY-2) */}
      <div className="vance-card vance-cascade-item delay-2" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        overflow: 'hidden',
        padding: 0,
        boxShadow: 'none'
      }}>
        {/* MESSAGES CHAT STREAM CONTAINER */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: 'var(--bg-surface)'
        }}>
          {messages.map((msg, idx) => {
            const isMe = (currentUserRole === 'client' && msg.role === 'client') || (currentUserRole === 'admin' && msg.role === 'agency');

            return (
              <div
                key={msg.id}
                className={`vance-cascade-item delay-${(idx % 5) + 1}`}
                style={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  gap: '12px',
                  alignItems: 'flex-end'
                }}
              >
                {!isMe && (
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 500,
                    flexShrink: 0
                  }}>
                    {msg.avatar}
                  </div>
                )}

                <div style={{
                  maxWidth: '65%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start'
                }}>
                  {/* Sender & Timestamp */}
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-subtle)',
                    marginBottom: '4px',
                    padding: '0 4px',
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{msg.sender}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>

                  {/* Message Bubble - Apple iMessage Curved Shape with Contrast */}
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    backgroundColor: isMe ? 'var(--text-main)' : 'var(--bg-card)',
                    color: isMe ? 'var(--text-inv)' : 'var(--text-main)',
                    fontSize: '13.5px',
                    lineHeight: 1.45,
                    wordBreak: 'break-word',
                    border: isMe ? 'none' : '1px solid var(--border-subtle)'
                  }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* FLOATING CAPSULE INPUT BAR AT BOTTOM */}
        <div style={{
          padding: '16px 24px',
          backgroundColor: 'var(--bg-card)',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <form
            onSubmit={handleSend}
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '9999px',
              padding: '6px 8px 6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              type="button"
              onClick={handleSimulatedAttachment}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s ease'
              }}
              title="Anexar arquivo"
            >
              <Paperclip size={18} strokeWidth={1.75} />
            </button>

            <input
              type="text"
              placeholder="Escreva sua mensagem para a equipe..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-main)',
                fontSize: '13.5px',
                padding: '8px 0'
              }}
            />

            <button
              type="submit"
              className="vance-btn primary"
              style={{
                borderRadius: '9999px',
                padding: '8px 18px',
                fontSize: '12.5px',
                height: '36px'
              }}
            >
              <Send size={14} strokeWidth={1.75} />
              <span>Enviar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
