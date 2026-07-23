import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { CreditCard, QrCode, CheckCircle2, Copy, Check, Download } from 'lucide-react';

export default function Pagamentos() {
  const { payments, payInvoice } = useProject();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [paying, setPaying] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const openPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
    setSuccessMsg(false);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136vancegroup-pix-key-9921382520450000053039865802BR5911VANCE GROUP6009SAO PAULO620705031236304E67C');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleSimulatePayment = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setSuccessMsg(true);
      if (selectedInvoice) {
        payInvoice(selectedInvoice.id);
      }
      setTimeout(() => {
        setModalOpen(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER CARD */}
      <div className="vance-card" style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>Resumo Financeiro & Pagamentos</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Transparência completa com controle de parcelas, faturas e quitação via PIX instantâneo.
        </p>
      </div>

      {/* METRICS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vance-card">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '4px' }}>Valor Total Contratado</div>
          <div style={{ fontSize: '22px', color: 'var(--text-main)' }}>
            <strong>R$ {payments.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
          </div>
        </div>

        <div className="vance-card">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '4px' }}>Valor Pago</div>
          <div style={{ fontSize: '22px', color: 'var(--text-main)' }}>
            <strong>R$ {payments.paid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
          </div>
        </div>

        <div className="vance-card">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '4px' }}>Valor Pendente</div>
          <div style={{ fontSize: '22px', color: 'var(--text-muted)' }}>
            <strong>R$ {payments.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
          </div>
        </div>

        <div className="vance-card">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '4px' }}>Próximo Vencimento</div>
          <div style={{ fontSize: '20px', color: 'var(--text-main)' }}>
            <strong>{payments.nextDueDate}</strong>
          </div>
        </div>
      </div>

      {/* HISTÓRICO DE FATURAS */}
      <div className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h2 style={{ fontSize: '18px' }}>Histórico de Parcelas</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {payments.history.map(inv => {
            const isPaid = inv.status === 'Pago';

            return (
              <div
                key={inv.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-main)' }}><strong>{inv.title}</strong></div>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '2px' }}>
                    Vencimento: <strong>{inv.dueDate}</strong> {isPaid && `• Pago em ${inv.paidAt}`}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '16px', color: 'var(--text-main)' }}>
                    <strong>R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                  </span>

                  <span className={`vance-badge ${isPaid ? 'active' : 'muted'}`}>
                    {isPaid ? 'Pago' : 'Pendente'}
                  </span>

                  {!isPaid ? (
                    <button
                      className="vance-btn primary"
                      onClick={() => openPaymentModal(inv)}
                    >
                      <CreditCard size={14} strokeWidth={1.75} />
                      <span>Pagar Agora</span>
                    </button>
                  ) : (
                    <button className="vance-btn sm">
                      <Download size={14} strokeWidth={1.75} />
                      <span>Comprovante</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL PAGAR AGORA */}
      {modalOpen && selectedInvoice && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="vance-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '28px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '6px' }}>Checkout Seguro Vance Group</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <strong>{selectedInvoice.title}</strong> • R$ {selectedInvoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>

            {successMsg ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={40} color="var(--text-main)" style={{ margin: '0 auto 12px' }} strokeWidth={1.75} />
                <h3 style={{ fontSize: '18px', color: 'var(--text-main)' }}>Pagamento Confirmado</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  A fatura foi baixada instantaneamente no seu portal.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  <button
                    className="vance-btn"
                    onClick={() => setPaymentMethod('pix')}
                    style={{
                      flex: 1,
                      backgroundColor: paymentMethod === 'pix' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      color: paymentMethod === 'pix' ? '#0A0B0D' : 'var(--text-muted)'
                    }}
                  >
                    <QrCode size={16} strokeWidth={1.75} />
                    <span>PIX Instantâneo</span>
                  </button>
                  <button
                    className="vance-btn"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      flex: 1,
                      backgroundColor: paymentMethod === 'card' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      color: paymentMethod === 'card' ? '#0A0B0D' : 'var(--text-muted)'
                    }}
                  >
                    <CreditCard size={16} strokeWidth={1.75} />
                    <span>Cartão de Crédito</span>
                  </button>
                </div>

                {paymentMethod === 'pix' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      display: 'inline-block'
                    }}>
                      <svg width="140" height="140" viewBox="0 0 100 100" fill="#000">
                        <rect x="0" y="0" width="30" height="30" fill="#000"/>
                        <rect x="5" y="5" width="20" height="20" fill="#FFF"/>
                        <rect x="10" y="10" width="10" height="10" fill="#000"/>

                        <rect x="70" y="0" width="30" height="30" fill="#000"/>
                        <rect x="75" y="5" width="20" height="20" fill="#FFF"/>
                        <rect x="80" y="10" width="10" height="10" fill="#000"/>

                        <rect x="0" y="70" width="30" height="30" fill="#000"/>
                        <rect x="5" y="75" width="20" height="20" fill="#FFF"/>
                        <rect x="10" y="80" width="10" height="10" fill="#000"/>

                        <rect x="40" y="10" width="20" height="20" fill="#000"/>
                        <rect x="40" y="40" width="30" height="30" fill="#000"/>
                        <rect x="80" y="40" width="10" height="40" fill="#000"/>
                        <rect x="10" y="40" width="20" height="10" fill="#000"/>
                      </svg>
                    </div>

                    <button className="vance-btn sm" onClick={handleCopyPix}>
                      {copiedPix ? <Check size={14} strokeWidth={1.75} /> : <Copy size={14} strokeWidth={1.75} />}
                      <span>{copiedPix ? 'Chave PIX Copiada' : 'Copiar Chave PIX'}</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input className="vance-input" placeholder="Número do Cartão" defaultValue="4532 •••• •••• 8821" />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input className="vance-input" placeholder="MM/AA" defaultValue="12/28" />
                      <input className="vance-input" placeholder="CVV" defaultValue="891" />
                    </div>
                    <input className="vance-input" placeholder="Nome impresso no cartão" defaultValue="LUCAS MENDES" />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button className="vance-btn" style={{ flex: 1 }} onClick={() => setModalOpen(false)}>
                    Cancelar
                  </button>
                  <button
                    className="vance-btn primary"
                    style={{ flex: 1 }}
                    onClick={handleSimulatePayment}
                    disabled={paying}
                  >
                    {paying ? 'Confirmando...' : 'Confirmar Pagamento'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
