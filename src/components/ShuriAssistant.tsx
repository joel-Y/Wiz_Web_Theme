import React, { useState, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Shield, Minimize2, ExternalLink } from 'lucide-react';

export const ShuriAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [activeTab, setActiveTab] = useState<'knowledge' | 'live-chat'>('knowledge');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'shuri' | 'user'; text: string; time: string }>>([
    {
      sender: 'shuri',
      text: 'Bonjour ! Je suis Shuri, l\'assistante IA de WizSmith. Comment puis-je vous accompagner pour sécuriser ou automatiser votre propriété à Abidjan ?',
      time: 'À l\'instant',
    },
  ]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (unreadBadge) setUnreadBadge(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputMessage('');

    // Contextual responses based on WizSmith knowledge
    setTimeout(() => {
      let reply = 'WizSmith propose des packs adaptés (à partir de : Business 25 000 CFA, Élite 40 000 CFA, Prestige 50 000 CFA). Souhaitez-vous planifier un audit gratuit de votre propriété ?';
      const lower = userText.toLowerCase();

      if (lower.includes('prix') || lower.includes('tarif') || lower.includes('pack') || lower.includes('coût')) {
        reply = 'Tous nos prix sont à partir de : 25 000 FCFA/mois pour le Pack Business, 40 000 FCFA/mois pour le Pack Élite (résidences & Airbnb) et 50 000 FCFA/mois pour le Pack Prestige (avec Apple HomeKit). L\'installation est assurée par nos techniciens.';
      } else if (lower.includes('airbnb') || lower.includes('clé') || lower.includes('code')) {
        reply = 'Pour les hôtes Airbnb, notre serrure WizLock génère automatiquement un code PIN temporaire valide uniquement pendant les dates de séjour du voyageur. Finies les remises de clés physiques !';
      } else if (lower.includes('camera') || lower.includes('caméra') || lower.includes('ia')) {
        reply = 'Bonne nouvelle : notre module IA WizBridge est compatible avec vos caméras existantes ! Il leur ajoute la détection des personnes, des véhicules et filtre les fausses alertes.';
      } else if (lower.includes('abidjan') || lower.includes('install') || lower.includes('contact')) {
        reply = 'Nos équipes interviennent partout à Abidjan (Cocody, Marcory, Plateau, Zone 4, Bingerville...). Nous pouvons planifier un diagnostic physique ou virtuel cette semaine.';
      }

      setMessages((prev) => [...prev, { sender: 'shuri', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div id="wizsmith-shuri-widget" className="fixed bottom-5 right-5 z-40">
        <button
          id="shuri-launcher"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label="Ouvrir l'assistant Shuri"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0047AB] via-[#0047AB] to-[#1A1A2E] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <Bot className="w-7 h-7 text-white" />
          {unreadBadge && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8630A] rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      </div>

      {/* Floating Shuri Window Drawer */}
      {isOpen && (
        <div
          id="shuri-frame"
          className="fixed bottom-20 right-4 sm:right-6 w-[380px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-100px)] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header Bar */}
          <div className="bg-[#1A1A2E] text-white p-3.5 px-4 flex items-center justify-between border-b-2 border-[#E8630A]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0047AB] flex items-center justify-center text-white font-bold text-xs">
                <Sparkles className="w-4 h-4 text-[#E8630A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                  <span>Shuri IA</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">En ligne</span>
                </h4>
                <p className="text-[11px] text-slate-400">Assistant WizSmith Property</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab(activeTab === 'live-chat' ? 'knowledge' : 'live-chat')}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1"
                title="Basculer entre l'iframe officielle et l'assistant rapide"
              >
                <span className="text-[11px]">{activeTab === 'knowledge' ? 'Iframe Shuri' : 'Discussion Directe'}</span>
              </button>
              <button
                id="shuri-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Fermer la fenêtre Shuri"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {activeTab === 'live-chat' ? (
            <div className="flex-1 w-full h-full relative bg-slate-50">
              <iframe
                id="shuri-iframe"
                src="https://shuri-chat.vercel.app/"
                allow="microphone; camera"
                title="Assistant Shuri WizSmith"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-hidden">
              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#0047AB] text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Pills */}
              <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] text-slate-600">
                <button
                  onClick={() => setInputMessage('Quels sont vos tarifs pour un Airbnb ?')}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Tarifs Airbnb
                </button>
                <button
                  onClick={() => setInputMessage('Comment fonctionne la serrure connectée ?')}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Serrure sans clé
                </button>
                <button
                  onClick={() => setInputMessage('Faites-vous l\'installation à Abidjan ?')}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Installation Abidjan
                </button>
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Posez votre question à Shuri..."
                  className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#0047AB] text-white hover:bg-blue-700 transition-colors shrink-0"
                  aria-label="Envoyer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};
