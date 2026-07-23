import React, { useState } from 'react';
import './KnowledgeBase.css';
import {
  Box,
  Home,
  Database,
  ArrowLeftRight,
  BarChart3,
  Plus,
  PanelLeftClose,
  Search,
  ChevronDown,
  Folder,
  FileText,
  Sun,
  Moon
} from 'lucide-react';

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('Folders'); // 'Folders' | 'Tags'
  const [selectedFolder, setSelectedFolder] = useState('General Knowledge');
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'dark'

  const foldersData = [
    {
      id: 'f1',
      name: 'Onboarding',
      filesCount: 15,
      apps: ['GD', 'N'] // Google Drive, Notion
    },
    {
      id: 'f2',
      name: 'Integrations',
      filesCount: 5,
      apps: ['N', 'GD', 'SL'] // Notion, Drive, Slack
    },
    {
      id: 'f3',
      name: 'Documents',
      filesCount: 10,
      apps: ['W', 'P'] // Word, PPT
    }
  ];

  const filesData = [
    {
      id: 'file-1',
      name: 'Onboarding-Guide.pdf',
      addedBy: 'kevin@mail.com',
      avatar: 'K'
    },
    {
      id: 'file-2',
      name: 'Product-Roadmap.docx',
      addedBy: 'antonwe@gmail.com',
      avatar: 'A'
    },
    {
      id: 'file-3',
      name: 'Brand-Assets-v2.zip',
      addedBy: 'gabriel@vancegroup.com',
      avatar: 'G'
    },
    {
      id: 'file-4',
      name: 'Client-Contract-Alpha.pdf',
      addedBy: 'lucas@clinicaalpha.com',
      avatar: 'L'
    }
  ];

  return (
    <div className={`kb-container ${themeMode}`}>
      {/* 1. LEFTMOST ICON RAIL */}
      <aside className="kb-icon-rail">
        <div className="kb-logo" title="Vance Group System">
          <Box size={22} strokeWidth={2} />
        </div>

        <nav className="kb-rail-nav">
          <button className="kb-rail-item" title="Inicio">
            <Home size={18} strokeWidth={1.75} />
          </button>
          <button className="kb-rail-item active" title="Knowledge Base / Storage">
            <Database size={18} strokeWidth={1.75} />
          </button>
          <button className="kb-rail-item" title="Fluxos / Integrações">
            <ArrowLeftRight size={18} strokeWidth={1.75} />
          </button>
          <button className="kb-rail-item" title="Métricas">
            <BarChart3 size={18} strokeWidth={1.75} />
          </button>
        </nav>

        {/* Theme switcher toggle inside icon rail */}
        <div style={{ marginTop: 'auto' }}>
          <button
            className="kb-rail-item"
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            title="Alternar Tema Claro/Escuro"
          >
            {themeMode === 'light' ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </aside>

      {/* 2. SIDEBAR TREE VIEW */}
      <aside className="kb-sidebar">
        <div className="kb-sidebar-header">
          <span className="kb-sidebar-title">Knowledge Base</span>
          <div className="kb-sidebar-actions">
            <button className="kb-action-icon" title="Adicionar pasta">
              <Plus size={16} strokeWidth={1.75} />
            </button>
            <button className="kb-action-icon" title="Ocultar painel">
              <PanelLeftClose size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="kb-search-box">
          <Search size={14} className="kb-search-icon" strokeWidth={1.75} />
          <input type="text" className="kb-search-input" placeholder="Search..." />
        </div>

        {/* Folders / Tags Pill */}
        <div className="kb-tabs-pill">
          <button
            className={`kb-tab-btn ${activeTab === 'Folders' ? 'active' : ''}`}
            onClick={() => setActiveTab('Folders')}
          >
            Folders
          </button>
          <button
            className={`kb-tab-btn ${activeTab === 'Tags' ? 'active' : ''}`}
            onClick={() => setActiveTab('Tags')}
          >
            Tags
          </button>
        </div>

        {/* Tree List Hierarchy */}
        <div className="kb-tree-list">
          <div
            className={`kb-tree-node ${selectedFolder === 'General Knowledge' ? 'selected' : ''}`}
            onClick={() => setSelectedFolder('General Knowledge')}
          >
            <div className="kb-node-left">
              <Folder size={15} strokeWidth={1.75} />
              <span>General Knowledge</span>
            </div>
            <span className="kb-node-badge">10</span>
          </div>

          {/* Subtree Level 1 */}
          <div className="kb-sub-tree">
            <div
              className={`kb-tree-node ${selectedFolder === 'Onboarding' ? 'selected' : ''}`}
              onClick={() => setSelectedFolder('Onboarding')}
            >
              <div className="kb-node-left">
                <Folder size={14} strokeWidth={1.75} />
                <span>Onboarding</span>
              </div>
              <span className="kb-node-badge">3</span>
            </div>

            {/* Subtree Level 2 */}
            <div className="kb-sub-tree">
              <div
                className={`kb-tree-node ${selectedFolder === 'Subfolder 1' ? 'selected' : ''}`}
                onClick={() => setSelectedFolder('Subfolder 1')}
              >
                <div className="kb-node-left">
                  <Folder size={13} strokeWidth={1.75} />
                  <span>Subfolder 1</span>
                </div>
                <span className="kb-node-badge">5</span>
              </div>

              <div
                className={`kb-tree-node ${selectedFolder === 'Subfolder 2' ? 'selected' : ''}`}
                onClick={() => setSelectedFolder('Subfolder 2')}
              >
                <div className="kb-node-left">
                  <Folder size={13} strokeWidth={1.75} />
                  <span>Subfolder 2</span>
                </div>
                <span className="kb-node-badge">10</span>
              </div>
            </div>

            <div
              className={`kb-tree-node ${selectedFolder === 'Integrations' ? 'selected' : ''}`}
              onClick={() => setSelectedFolder('Integrations')}
            >
              <div className="kb-node-left">
                <Folder size={14} strokeWidth={1.75} />
                <span>Integrations</span>
              </div>
            </div>

            <div
              className={`kb-tree-node ${selectedFolder === 'Documents' ? 'selected' : ''}`}
              onClick={() => setSelectedFolder('Documents')}
            >
              <div className="kb-node-left">
                <Folder size={14} strokeWidth={1.75} />
                <span>Documents</span>
              </div>
            </div>
          </div>

          <div
            className={`kb-tree-node ${selectedFolder === 'Onboarding Design' ? 'selected' : ''}`}
            onClick={() => setSelectedFolder('Onboarding Design')}
            style={{ marginTop: '6px' }}
          >
            <div className="kb-node-left">
              <Folder size={15} strokeWidth={1.75} />
              <span>Onboarding Design</span>
            </div>
          </div>

          <div
            className={`kb-tree-node ${selectedFolder === 'Team Interviews' ? 'selected' : ''}`}
            onClick={() => setSelectedFolder('Team Interviews')}
          >
            <div className="kb-node-left">
              <Folder size={15} strokeWidth={1.75} />
              <span>Team Interviews</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <main className="kb-main-content">
        {/* Dropdown Header */}
        <div className="kb-main-header">
          <button className="kb-dropdown-btn">
            <span>{selectedFolder}</span>
            <ChevronDown size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Folders Section */}
        <section>
          <h2 className="kb-section-title">Folders</h2>

          <div className="kb-folders-grid">
            {foldersData.map(f => (
              <div key={f.id} className="kb-folder-card" onClick={() => setSelectedFolder(f.name)}>
                <div className="kb-folder-graphic-wrapper">
                  <div className="kb-folder-papers" />
                  <div className="kb-folder-body">
                    <div className="kb-folder-apps">
                      {f.apps.map((app, idx) => (
                        <div key={idx} className="kb-app-badge">
                          {app}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="kb-folder-meta">
                  <div className="kb-folder-name">{f.name}</div>
                  <div className="kb-folder-count">{f.filesCount} Files</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Files Table Section */}
        <section>
          <h2 className="kb-section-title">Files</h2>

          <div className="kb-files-table-container">
            <table className="kb-files-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Added By</th>
                </tr>
              </thead>
              <tbody>
                {filesData.map(file => (
                  <tr key={file.id}>
                    <td>
                      <div className="kb-file-cell">
                        <FileText size={16} color="#777777" strokeWidth={1.75} />
                        <span>{file.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="kb-user-cell">
                        <div className="kb-avatar">{file.avatar}</div>
                        <span>{file.addedBy}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
