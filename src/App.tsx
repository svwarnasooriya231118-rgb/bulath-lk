import React, { useState } from 'react';
import { BookOpen, Calendar, ShieldAlert, ShoppingBag, MessageSquare, PlusCircle, Search, Phone, User, Send, Tag } from 'lucide-react';

interface Listing {
  id: number;
  title: string;
  category: string;
  price: string;
  location: string;
  contact: string;
  description: string;
  seller: string;
}

interface Message {
  id: number;
  listingTitle: string;
  sender: string;
  text: string;
  time: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'schedule' | 'disease' | 'marketplace' | 'messages'>('guide');
  
  // Marketplace State
  const [listings, setListings] = useState<Listing[]>([
    { id: 1, title: "හපන් ඉගුරු බුලත් පැළ 500ක්", category: "පැල (Plants)", price: Rs 25/-, location: "කුරුණෑගල", contact: "0712345678", description: "නිරෝගී උස තත්ත්වයේ බුලත් පැළ ඇත.", seller: "ශාන්ත කුමාර" },
    { id: 2, title: "තාබු කෙළින් බුලත් කොළ තොගයක්", category: "කොළ (Leaves)", price: Rs 600/- (සියය), location: "ගම්පහ", contact: "0779876543", description: "නෙළන ලද නැවුම් බුලත් කොළ තොගයක් ඇත.", seller: "සම්පත් පෙරේරා" },
    { id: 3, title: "කාබනික බුලත් පොහොර සහ බෙහෙත්", category: "බෙහෙත් හා උපකරණ", price: Rs 1500/-, location: "අනුරාධපුරය", contact: "0701122334", description: "දිලීර නාಶක සහ වර්ධක දියර.", seller: "මහේන්ද්‍ර" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("සියල්ල");
  
  // New Listing Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("පැල (Plants)");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSeller, setNewSeller] = useState("");

  // Messages State
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, listingTitle: "හපන් ඉගුරු බුලත් පැළ 500ක්", sender: "නිමල් පෙරේරා", text: "පැළ 100ක් ගන්න පුළුවන්ද? මිල කොපමණද?", time: "අද 10:30 AM" }
  ]);
  const [chatText, setChatText] = useState("");
  const [activeChatListing, setActiveChatListing] = useState<Listing | null>(null);

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newContact) return;
    const newItem: Listing = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      price: newPrice,
      location: newLocation,
      contact: newContact,
      description: newDesc,
      seller: newSeller || "පරිශීලක"
    };
    setListings([newItem, ...listings]);
    setNewTitle("");
    setNewPrice("");
    setNewLocation("");
    setNewContact("");
    setNewDesc("");
    setNewSeller("");
    setShowAddForm(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim() || !activeChatListing) return;
    const newMsg: Message = {
      id: Date.now(),
      listingTitle: activeChatListing.title,
      sender: "මම (खरीدار/ගැණුම්කරු)",
      text: chatText,
      time: "දැන්"
    };
    setMessages([newMsg, ...messages]);
    setChatText("");
    alert("ඔබේ පණිවිඩය විකුණුම්කරු වෙත සාර්ථකව යවන ලදී!");
  };

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "සියල්ල" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-emerald-800 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full text-emerald-800 font-bold">🌿</div>
            <div>
              <h1 className="text-xl font-bold">බුලත් වගා මාර්ගෝපදේශය</h1>
              <p className="text-xs text-emerald-200">Bulath LK - Marketplace & App</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex overflow-x-auto px-2 py-2 space-x-2">
          <button onClick={() => setActiveTab('guide')} className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'guide' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
            <BookOpen className="w-4 h-4" />
            <span>මාර්ගෝපදේශය</span>
          </button>
          <button onClick={() => setActiveTab('schedule')} className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'schedule' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
            <Calendar className="w-4 h-4" />
            <span>කාලසටහන</span>
          </button>
          <button onClick={() => setActiveTab('disease')} className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'disease' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
            <ShieldAlert className="w-4 h-4" />
            <span>රෝග පාලනය</span>
          </button>
          <button onClick={() => setActiveTab('marketplace')} className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'marketplace' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
            <ShoppingBag className="w-4 h-4" />
            <span>වෙළඳපොළ (Marketplace)</span>
          </button>
          <button onClick={() => setActiveTab('messages')} className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'messages' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
            <MessageSquare className="w-4 h-4" />
            <span>පණිවිඩ ({messages.length})</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-4 mb-16">
        {activeTab === 'guide' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100">
              <h2 className="text-lg font-bold text-emerald-800 mb-2">බුලත් වගාව සාර්ථක කරගැනීමේ මූලික පියවර</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                බුලත් (Piper betle) වගාව ලංකාවේ සාම්ප්‍රදායික හා ආර්ථික වශයෙන් ඉතා වැදගත් වේ. නිසි සෙවන, ජල කළමනාකරණය සහ පස සැකසීම මෙහිදී ප්‍රධාන වේ.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100">
            <h2 className="text-lg font-bold text-emerald-800 mb-3">වගා කාලසටහන සහ නඩත්තුව</h2>
            <p className="text-sm text-slate-600">මෙහි වගාවට අවශ්‍ය පොහොර යෙදීම සහ ජල සම්පාදන කාලසටහන් ඇතුළත් වේ.</p>
          </div>
        )}

        {activeTab === 'disease' && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100">
            <h2 className="text-lg font-bold text-emerald-800 mb-3">රෝග පාලනය සහ ප්‍රතිකාර</h2>
            <p className="text-sm text-slate-600">කොළ කුණුවීමේ රෝග සහ පාමුල පচন රෝග සඳහා ප්‍රතිකාර ක්‍රම.</p>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white p-4 rounded-xl shadow-sm border">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="සොයන්න (පැළ, කොළ, ප්‍රදේශය)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-800 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>දැන්වීමක් පළ කරන්න</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {['සියල්ල', 'පැල (Plants)', 'කොළ (Leaves)', 'බෙහෙත් හා උපකරණ'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${selectedCategory === cat ? 'bg-emerald-800 text-white' : 'bg-white border text-slate-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Add Listing Form Modal / Section */}
            {showAddForm && (
              <form onSubmit={handleAddListing} className="bg-white p-5 rounded-xl shadow-md border border-emerald-200 space-y-3">
                <h3 className="font-bold text-emerald-800 text-base">අලුත් විකුණුම් දැන්වීමක් එකතු කරන්න</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="ශීර්ෂය (උදා: බුලත් පැළ 200ක්)" value={newTitle} onChange={e => setNewTitle(e.target.value)} required className="p-2 border rounded text-sm" />
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="p-2 border rounded text-sm">
                    <option value="පැල (Plants)">පැල (Plants)</option>
                    <option value="කොළ (Leaves)">කොළ (Leaves)</option>
                    <option value="බෙහෙත් හා උපකරණ">බෙහෙත් හා උපකරණ</option>
                  </select>
                  <input type="text" placeholder="මිල (උදා: Rs 30/- ಪ್ರತಿ පැළයක්)" value={newPrice} onChange={e => setNewPrice(e.target.value)} required className="p-2 border rounded text-sm" />
                  <input type="text" placeholder="ප්‍රදේශය (උදා: කුරුණෑගල)" value={newLocation} onChange={e => setNewLocation(e.target.value)} required className="p-2 border rounded text-sm" />
                  <input type="text" placeholder="දුරකථන අංකය" value={newContact} onChange={e => setNewContact(e.target.value)} required className="p-2 border rounded text-sm" />
                  <input type="text" placeholder="ඔබේ නම" value={newSeller} onChange={e => setNewSeller(e.target.value)} className="p-2 border rounded text-sm" />
                </div>
                <textarea placeholder="විස්තරය..." value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full p-2 border rounded text-sm" rows={2}></textarea>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded text-sm text-slate-600">අවලංගු කරන්න</button>
                  <button type="submit" className="px-4 py-2 bg-emerald-700 text-white rounded text-sm font-medium">ප්‍රකාශ කරන්න</button>
                </div>
              </form>
            )}

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredListings.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">{item.category}</span>
                      <span className="font-bold text-emerald-700 text-sm">{item.price}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-2">📍 {item.location} | විකුණුම්කරු: {item.seller}</p>
                    <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <a href={`tel:${item.contact}`} className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.contact}</span>
                    </a>
                    <button 
                      onClick={() => { setActiveChatListing(item); setActiveTab('messages'); }}
                      className="flex items-center space-x-1 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>මැසේජ් කරන්න</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100 space-y-4">
            <h2 className="text-lg font-bold text-emerald-800">විමසීම් සහ පණිවිඩ (Messages)</h2>
            
            {activeChatListing && (
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex justify-between items-center">
                <span>💬 සාකච්ඡා කරන දැන්වීම: <strong>{activeChatListing.title}</strong> ({activeChatListing.seller})</span>
                <button onClick={() => setActiveChatListing(null)} className="text-emerald-700 font-bold underline">ඉවත් වන්න</button>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                placeholder={activeChatListing ? `${activeChatListing.seller} වෙත පණිවිඩයක් ලියන්න...` : "පණිවිඩයක් ලියන්න..."}
                value={chatText}
                onChange={e => setChatText(e.target.value)}
                className="flex-1 p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
              <button type="submit" className="bg-emerald-700 text-white px-4 py-2.5 rounded-lg flex items-center space-x-1 text-sm font-medium hover:bg-emerald-800">
                <Send className="w-4 h-4" />
                <span>යවන්න</span>
              </button>
            </form>

            <div className="space-y-3 mt-4">
              {messages.map(msg => (
                <div key={msg.id} className="p-3 bg-slate-50 border rounded-lg text-sm space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span className="text-emerald-800">📌 {msg.listingTitle}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold">👤 {msg.sender}:</p>
                  <p className="text-slate-800">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-400 border-t bg-white">
        © 2026 Bulath LK. All rights reserved.
      </footer>
    </div>
  );
}
