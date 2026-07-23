import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { FolderDown, Download, Upload, FileText, CheckCircle2, Search } from 'lucide-react';

export default function Arquivos() {
  const { files, addFile } = useProject();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileCat, setFileCat] = useState('Documentos');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const categories = ['Todos', 'Logos', 'Textos', 'Imagens', 'Documentos', 'Versão final', 'Contrato'];

  const filteredFiles = files.filter(f => {
    const matchesCat = selectedCategory === 'Todos' || f.category === selectedCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulatedDownload = (fileName) => {
    const blob = new Blob([`Conteúdo simulado do arquivo Vance Group: ${fileName}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;
    addFile({
      name: fileName,
      category: fileCat,
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`
    });
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setFileName('');
    }, 1200);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER & UPLOAD BUTTON */}
      <div className="vance-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Central de Arquivos</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Baixe os entregáveis do projeto ou envie documentos solicitados pela equipe.
          </p>
        </div>

        <button className="vance-btn primary" onClick={() => setUploadModalOpen(true)}>
          <Upload size={15} strokeWidth={1.75} />
          <span>Enviar Arquivo</span>
        </button>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#0A0B0D' : 'var(--text-muted)',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={14} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} strokeWidth={1.75} />
          <input
            type="text"
            className="vance-input"
            placeholder="Buscar arquivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '34px', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* FILES LIST */}
      <div className="vance-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredFiles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-subtle)' }}>
            Nenhum arquivo encontrado nesta categoria.
          </div>
        ) : (
          filteredFiles.map(file => (
            <div
              key={file.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)'
                }}>
                  <FileText size={18} strokeWidth={1.75} />
                </div>

                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-main)' }}>{file.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '2px' }}>
                    Enviado por {file.uploader} • {file.date}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="vance-badge active">{file.category}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-subtle)', width: '60px', textAlign: 'right' }}>
                  {file.size}
                </span>

                <button
                  className="vance-btn sm"
                  onClick={() => handleSimulatedDownload(file.name)}
                >
                  <Download size={14} strokeWidth={1.75} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* UPLOAD MODAL */}
      {uploadModalOpen && (
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
            <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Enviar Novo Arquivo</h3>

            {uploadSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={36} color="var(--text-main)" style={{ margin: '0 auto 10px' }} strokeWidth={1.75} />
                <span style={{ fontSize: '14px', color: 'var(--text-main)' }}>Arquivo enviado com sucesso</span>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Nome do Arquivo
                  </label>
                  <input
                    type="text"
                    className="vance-input"
                    placeholder="Ex: Foto_Consultorio_Nova.png"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Categoria
                  </label>
                  <select
                    className="vance-select"
                    value={fileCat}
                    onChange={(e) => setFileCat(e.target.value)}
                  >
                    <option value="Logos">Logos</option>
                    <option value="Textos">Textos</option>
                    <option value="Imagens">Imagens</option>
                    <option value="Documentos">Documentos</option>
                    <option value="Versão final">Versão final</option>
                    <option value="Contrato">Contrato</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    className="vance-btn"
                    style={{ flex: 1 }}
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="vance-btn primary" style={{ flex: 1 }}>
                    <Upload size={14} strokeWidth={1.75} />
                    <span>Confirmar Upload</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
