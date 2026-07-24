import React, { useState, useEffect } from 'react';
import { Leaf, Calendar, Droplets, Sun, ShieldCheck, Download, BookOpen } from 'lucide-react';

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'schedule' | 'tips'>('guide');

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-slate-800 pb-12">
      <header className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full shadow text-emerald-700">
              <Leaf className="w-8 h-8 fill-emerald-100" />
            </div>
            <div>
              <h1 className="text-xl font-bold">බුලත් වගා මාර්ගෝපදේශය</h1>
              <p className="text-xs text-emerald-200">Bulath LK - PWA App</p>
            </div>
          </div>
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 shadow transition"
            >
              <Download className="w-4 h-4" />
              <span>ඇප් එක බාගන්න</span>
            </button>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex space-x-2 bg-white p-1 rounded-xl shadow-sm border border-emerald-100">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition flex items-center justify-center space-x-2 ${
              activeTab === 'guide' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-emerald-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>මාර්ගෝපදේශය</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition flex items-center justify-center space-x-2 ${
              activeTab === 'schedule' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-emerald-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>කාලසටහන</span>
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition flex items-center justify-center space-x-2 ${
              activeTab === 'tips' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-emerald-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>රෝග පාලනය</span>
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
              <h2 className="text-lg font-bold text-emerald-800 mb-3 flex items-center space-x-2">
                <Leaf className="w-5 h-5" />
                <span>බුලත් වගාව සාර්ථක කරගැනීමේ මූලික පියවර</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                බුලත් (Piper betle) වගාව ලංකාවේ සාම්ප්‍රදායික හා ආර්ථික වශයෙන් ඉතා වැදගත් වේ. නිසි සෙවන, ජල කළමනාකරණය සහ පස සැකසීම මෙහිදී ප්‍රධාන වේ.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <h3 className="font-semibold text-emerald-900 text-sm mb-2 flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-emerald-700" />
                    <span>සෙවන සහ ආලෝකය</span>
                  </h3>
                  <p className="text-xs text-slate-600">50%-75% අතර සෙවනක් සහිත තෙතමනය රඳාපවතින පරිසරයක් අවශ්‍ය වේ.</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <h3 className="font-semibold text-emerald-900 text-sm mb-2 flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-emerald-700" />
                    <span>ජල සම්පාදනය</span>
                  </h3>
                  <p className="text-xs text-slate-600">පස නිතරම තෙතමනයින් තබා ගන්න, නමුත් ජලය එකතු වී කුණුවීමෙන් වළකින්න.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 space-y-4">
            <h2 className="text-lg font-bold text-emerald-800 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>වගා කළමනාකරණ කාලසටහන</span>
            </h2>
            <div className="space-y-3 text-sm">
              <div className="border-l-4 border-emerald-600 pl-4 py-2">
                <h4 className="font-semibold text-emerald-900">1 වන සතිය: පස් සැකසීම සහ සිටුවීම</h4>
                <p className="text-xs text-slate-600">කොම්පෝස්ට් යොදා ගොඩැලි සකසා නිරෝගී බුලත් cuttings සිටුවීම.</p>
              </div>
              <div className="border-l-4 border-emerald-600 pl-4 py-2">
                <h4 className="font-semibold text-emerald-900">මාස 3-4: අස්වනු නෙළීම</h4>
                <p className="text-xs text-slate-600">පළමු අස්වැන්න නෙළා ගැනීම සහ නඩත්තුව.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 space-y-4">
            <h2 className="text-lg font-bold text-emerald-800 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5" />
              <span>රෝග පාලනය</span>
            </h2>
            <p className="text-sm text-slate-600">
              දිලීර රෝග පාලනයට වගා බිමේ ජලය බැසයාම ක්‍රමවත් කර රෝගී කොළ ඉවත් කරන්න.
            </p>
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto px-4 mt-12 text-center text-xs text-slate-500">
        <p>© 2026 Bulath LK. All rights reserved.</p>
      </footer>
    </div>
  );
}
