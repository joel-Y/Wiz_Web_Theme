import React, { useState } from 'react';
import { Folder, FileCode, Download, Copy, Check, Terminal, ExternalLink, X, BookOpen, Layers, Sparkles } from 'lucide-react';
import JSZip from 'jszip';
import { odooModuleFiles, OdooFile } from '../data/odooModuleFiles';

interface OdooThemeInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OdooThemeInspector: React.FC<OdooThemeInspectorProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<OdooFile>(odooModuleFiles[0]);
  const [copied, setCopied] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'guide' | 'checklist'>('files');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    try {
      const zip = new JSZip();
      const rootFolder = zip.folder('website_wizsmith_theme');

      if (rootFolder) {
        odooModuleFiles.forEach((file) => {
          rootFolder.file(file.path, file.content);
        });

        // Add empty init in static dirs if needed
        rootFolder.folder('static/description');
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'website_wizsmith_theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip:', err);
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1A1A2E] text-white rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0047AB] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              OS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Module Web Platform : <span className="text-[#E8630A] font-mono">website_wizsmith_theme</span>
                </h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  Prêt au déploiement
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Thème autonome certifié WizSmith Platform · 0 dépendance propriétaire
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={downloadingZip}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#E8630A] hover:bg-[#d45806] transition-colors shadow-sm disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingZip ? 'Génération du .ZIP...' : 'Télécharger le module (.ZIP)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Fermer l'inspecteur"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 border-b border-slate-800 bg-slate-900/40 flex items-center gap-4 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 px-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'files' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Fichiers Source ({odooModuleFiles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-2 px-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'guide' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Guide d'Installation &amp; Upgrade</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-2 px-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'checklist' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Audit &amp; Checklist Staging</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-12 h-full">
              {/* File Tree Left Column */}
              <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/50 p-4 overflow-y-auto space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
                  Arborescence du module
                </div>
                <div className="space-y-1">
                  {odooModuleFiles.map((file) => {
                    const isSelected = selectedFile.path === file.path;
                    return (
                      <button
                        key={file.path}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between font-mono transition-colors ${
                          isSelected
                            ? 'bg-[#0047AB] text-white font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {file.language === 'python' ? (
                            <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : file.language === 'xml' ? (
                            <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : file.language === 'scss' ? (
                            <FileCode className="w-4 h-4 text-pink-400 shrink-0" />
                          ) : (
                            <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                          )}
                          <span className="truncate">{file.path}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          {file.language}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Viewer Right Column */}
              <div className="md:col-span-8 flex flex-col h-full bg-slate-950/80 overflow-hidden">
                <div className="p-3 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 shrink-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span className="text-[#E8630A]">website_wizsmith_theme/</span>
                    <span className="font-bold text-white">{selectedFile.path}</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié !' : 'Copier le code'}</span>
                  </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-text selection:bg-[#0047AB] selection:text-white">
                  {selectedFile.content}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="p-8 overflow-y-auto max-w-4xl mx-auto space-y-8 text-slate-200 text-sm">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Procédure de déploiement en environnement Staging
                </h3>
                <p className="text-slate-400 text-xs">
                  Suivez cette procédure pour installer ou mettre à jour le thème sans impacter les données de production.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0047AB] flex items-center justify-center text-xs">1</span>
                    <span>Extraction dans vos Addons Personnalisés</span>
                  </h4>
                  <p className="text-slate-300 text-xs mb-3">
                    Téléchargez le fichier ZIP ou déposez le dossier <code className="text-[#E8630A]">website_wizsmith_theme</code> dans votre répertoire d'addons configuré dans <code className="text-slate-200">server.conf</code> :
                  </p>
                  <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
                    unzip website_wizsmith_theme.zip -d /custom_addons/
                  </pre>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0047AB] flex items-center justify-center text-xs">2</span>
                    <span>Installation CLI en Staging (Recommandé)</span>
                  </h4>
                  <p className="text-slate-300 text-xs mb-3">
                    Exécutez la commande suivante pour installer et compiler les assets SCSS/JS directement sur votre base de test :
                  </p>
                  <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
                    ./server-bin -c server.conf -d nom_de_base_staging -i website_wizsmith_theme --stop-after-init
                  </pre>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0047AB] flex items-center justify-center text-xs">3</span>
                    <span>Mise à jour subséquente (Upgrade)</span>
                  </h4>
                  <p className="text-slate-300 text-xs mb-3">
                    Pour rafraîchir les templates XML et les feuilles de style après modification :
                  </p>
                  <pre className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
                    ./server-bin -c server.conf -d nom_de_base_staging -u website_wizsmith_theme --stop-after-init
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="p-8 overflow-y-auto max-w-4xl mx-auto space-y-6 text-sm">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Checklist de validation technique &amp; conformité WizSmith Platform
                </h3>
                <p className="text-slate-400 text-xs">
                  Vérifications effectuées conformément au cahier des charges WizSmith.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Architecture Haute Disponibilité', desc: 'Validé sur architecture modulaire temps réel sans aucune dépendance externe propriétaire.' },
                  { title: 'Palette Officielle WizSmith', desc: 'Bleu cobalt #0047AB, Marine nuit #1A1A2E, Orange accent #E8630A.' },
                  { title: 'Intégration Shuri AI', desc: 'Iframe https://shuri-chat.vercel.app/ préservée avec disposition mobile non intrusive.' },
                  { title: 'Gestionnaire Cookies RGPD', desc: 'Respect strict de localStorage(cookieConsent) et modalité de personnalisation.' },
                  { title: 'Tarifs et Abonnements', desc: 'Business (à partir de 25 000 CFA), Élite (à partir de 40 000 CFA), Prestige (à partir de 50 000 CFA) intacts.' },
                  { title: 'Responsive 320px - 1440px', desc: 'Contrôles tactiles >= 44px, aucun débordement horizontal ni texte tronqué.' },
                  { title: 'Support Multilingue & RTL', desc: 'Préparé pour le Français, Anglais, Espagnol et Arabe avec inversion de sens de lecture.' },
                  { title: 'URLs et Liens Préservés', desc: '/comment-ca-fonctionne, /packs, /residences-airbnb, /hotels-intelligents, /page/appointment.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
