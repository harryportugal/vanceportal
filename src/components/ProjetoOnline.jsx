import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';

export default function ProjetoOnline() {
  const { project } = useProject();
  const [device, setDevice] = useState('desktop');

  // Purge any legacy mock URL from state and fallback to harryportugal.com
  const activeUrl = (project.stagingUrl && !project.stagingUrl.includes('vancegroup.com'))
    ? project.stagingUrl
    : 'https://harryportugal.com';

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 150px)',
      minHeight: '620px'
    }}>
      {/* DIRECT FULL-BLEED STAGING CONTAINER FOR HARRYPORTUGAL.COM */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0A0B0D',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        
        {/* DISCREET FLOATING CONTROL BUTTONS ON TOP RIGHT */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          zIndex: 50,
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {/* Device Switcher Pills */}
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            padding: '3px',
            borderRadius: '9999px',
            gap: '2px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <button
              onClick={() => setDevice('desktop')}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: device === 'desktop' ? '#FFFFFF' : 'transparent',
                color: device === 'desktop' ? '#000000' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontWeight: 500,
                transition: 'all 0.15s ease'
              }}
              title="Visão Desktop"
            >
              <Monitor size={13} strokeWidth={1.75} />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setDevice('tablet')}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: device === 'tablet' ? '#FFFFFF' : 'transparent',
                color: device === 'tablet' ? '#000000' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontWeight: 500,
                transition: 'all 0.15s ease'
              }}
              title="Visão Tablet"
            >
              <Tablet size={13} strokeWidth={1.75} />
              <span>Tablet</span>
            </button>

            <button
              onClick={() => setDevice('mobile')}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: device === 'mobile' ? '#FFFFFF' : 'transparent',
                color: device === 'mobile' ? '#000000' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontWeight: 500,
                transition: 'all 0.15s ease'
              }}
              title="Visão Mobile"
            >
              <Smartphone size={13} strokeWidth={1.75} />
              <span>Mobile</span>
            </button>
          </div>

          <a
            href={activeUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '7px 14px',
              fontSize: '11px',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span>{activeUrl.replace('https://', '').replace('http://', '')}</span>
            <ExternalLink size={12} strokeWidth={1.75} />
          </a>
        </div>

        {/* PREVIEW CANVAS IFRAME FOR ACTIVE STAGING URL */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: device === 'desktop' ? '0' : '24px',
          overflow: 'auto',
          position: 'relative'
        }}>
          <iframe
            key={activeUrl}
            src={activeUrl}
            title="Website Preview"
            style={{
              width: getDeviceWidth(),
              height: device === 'desktop' ? '100%' : '620px',
              border: 'none',
              borderRadius: device === 'desktop' ? '0' : '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: device === 'desktop' ? 'none' : '0 16px 40px rgba(0,0,0,0.4)',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          />
        </div>

      </div>
    </div>
  );
}
