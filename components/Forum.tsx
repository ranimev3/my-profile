import React, { useState, useEffect, useRef } from 'react';
import { Section, User, ForumPost } from '../types';
import { CyberCard } from './ui/CyberCard';
import { MessageSquare, Shield, LogIn, Send, Github, User as UserIcon, Lock, Globe, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

const MOCK_INITIAL_POSTS: ForumPost[] = [
  {
    id: 'system-init',
    author: { id: 'admin-01', username: 'SYSTEM_ADMIN', avatar: '', type: 'admin' },
    content: 'Global communication uplink established. RWA protocols active. Welcome to the public frequency.',
    timestamp: Date.now() - 10000000,
    likes: 999
  },
  {
    id: 'welcome-msg',
    author: { id: 'hiro-01', username: 'shanachan', avatar: 'https://picsum.photos/seed/hiro/50/50', type: 'admin' },
    content: 'Feel free to drop questions about the architecture or just say hi. Login required to transmit data packets.',
    timestamp: Date.now() - 8600000,
    likes: 42
  }
];

export const Forum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Login Logic State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<'select' | 'github-input'>('select');
  const [githubInput, setGithubInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize
  useEffect(() => {
    // Load posts from local storage or use mock
    const savedPosts = localStorage.getItem('neon_forum_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(MOCK_INITIAL_POSTS);
    }

    // Load user session
    const savedUser = localStorage.getItem('neon_forum_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Auto-scroll to bottom on new post
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [posts]);

  const resetModal = () => {
      setIsLoginModalOpen(false);
      setLoginStep('select');
      setGithubInput('');
      setAuthError('');
      setIsLoading(false);
  };

  const handleGuestLogin = () => {
    const mockUser: User = {
      id: `guest-${Date.now()}`,
      username: `Guest_${Math.floor(Math.random() * 1000)}`,
      avatar: '',
      type: 'guest'
    };
    loginUser(mockUser);
  };

  const handleGithubConnect = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!githubInput.trim()) return;

      setIsLoading(true);
      setAuthError('');

      try {
          // Real connection to GitHub API to verify identity
          const response = await fetch(`https://api.github.com/users/${githubInput}`);
          
          if (!response.ok) {
              throw new Error('Signal lost. User identity not found on GitHub mainframe.');
          }

          const data = await response.json();
          
          const user: User = {
              id: data.id.toString(),
              username: data.login,
              avatar: data.avatar_url,
              type: 'github'
          };
          
          loginUser(user);

      } catch (err) {
          setAuthError('Identity verification failed. Please check the username.');
      } finally {
          setIsLoading(false);
      }
  };

  const loginUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('neon_forum_user', JSON.stringify(user));
    resetModal();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('neon_forum_user');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    const newPost: ForumPost = {
      id: `msg-${Date.now()}`,
      author: currentUser,
      content: newMessage,
      timestamp: Date.now(),
      likes: 0
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('neon_forum_posts', JSON.stringify(updatedPosts));
    setNewMessage('');
  };

  const formatTime = (ms: number) => {
    return new Date(ms).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
  };

  return (
    <section id={Section.FORUM} className="py-20 relative bg-cyber-dark border-t border-cyber-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
                <h2 className="text-cyber-primary font-tech tracking-widest text-sm mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 animate-pulse" /> PUBLIC NETWORK
                </h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                    GLOBAL COMMS
                </h3>
            </div>
            
            <div className="flex items-center gap-4">
                {currentUser ? (
                    <div className="flex items-center gap-4 bg-cyber-gray/20 p-2 rounded-lg border border-cyber-primary/30">
                        <div className="flex items-center gap-3">
                            {currentUser.avatar ? (
                                <img src={currentUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-cyber-primary" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-cyber-primary/20 flex items-center justify-center border border-cyber-primary">
                                    <UserIcon className="w-4 h-4 text-cyber-primary" />
                                </div>
                            )}
                            <div className="text-left hidden sm:block">
                                <div className="text-xs font-tech text-slate-400">OPERATOR ID</div>
                                <div className="text-sm font-bold text-white leading-none">{currentUser.username}</div>
                            </div>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="px-3 py-1 text-xs font-tech text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-500 rounded transition-colors"
                        >
                            DISCONNECT
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsLoginModalOpen(true)}
                        className="group flex items-center gap-2 px-6 py-3 bg-cyber-primary text-cyber-black font-bold font-display hover:bg-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    >
                        <LogIn className="w-4 h-4" />
                        ACCESS TERMINAL
                    </button>
                )}
            </div>
        </div>

        {/* Forum Container */}
        <CyberCard className="h-[600px] flex flex-col p-0 overflow-hidden relative" variant="glass">
            {/* Toolbar */}
            <div className="px-6 py-3 border-b border-white/5 bg-black/20 flex justify-between items-center backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-2 text-xs font-tech text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>ENCRYPTION: ENABLED</span>
                    <span className="mx-2">|</span>
                    <span>NODES: {posts.length}</span>
                </div>
                <div className="text-xs font-tech text-cyber-secondary opacity-50">
                    PROTOCOL v2.5
                </div>
            </div>

            {/* Messages Area */}
            <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyber-primary/20 scrollbar-track-transparent"
            >
                {posts.map((post) => (
                    <div key={post.id} className={`flex gap-4 group ${post.author.type === 'admin' ? 'bg-cyber-primary/5 -mx-2 p-2 rounded' : ''}`}>
                        {/* Avatar Column */}
                        <div className="flex-shrink-0 pt-1">
                             {post.author.avatar ? (
                                <img src={post.author.avatar} alt={post.author.username} className="w-10 h-10 rounded-sm border border-white/10" />
                            ) : (
                                <div className={`w-10 h-10 rounded-sm flex items-center justify-center border font-display font-bold text-lg
                                    ${post.author.type === 'admin' ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary' : 'bg-cyber-gray/50 border-white/10 text-slate-400'}
                                `}>
                                    {post.author.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Content Column */}
                        <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className={`font-display text-sm font-bold ${post.author.type === 'admin' ? 'text-cyber-primary' : 'text-white'}`}>
                                    {post.author.username}
                                </span>
                                {post.author.type === 'admin' && (
                                    <span className="text-[10px] bg-cyber-primary/20 text-cyber-primary px-1 rounded border border-cyber-primary/30">ADMIN</span>
                                )}
                                <span className="text-[10px] font-tech text-slate-500">
                                    {formatTime(post.timestamp)}
                                </span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed font-sans">
                                {post.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area - Compact Design */}
            <div className="p-3 bg-cyber-black/80 border-t border-white/10 backdrop-blur-lg">
                {currentUser ? (
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Enter transmission..."
                            className="flex-1 bg-cyber-gray/20 border border-cyber-gray text-white px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-cyber-primary focus:bg-cyber-gray/30 transition-all font-tech"
                        />
                        <button 
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="px-4 py-2 text-xs bg-cyber-primary text-cyber-black font-bold font-display hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded-sm uppercase tracking-wider"
                        >
                            TRANSMIT <Send className="w-3 h-3" />
                        </button>
                    </form>
                ) : (
                    <div className="flex items-center justify-center h-10 border border-dashed border-slate-700 rounded-sm bg-white/5">
                        <span className="text-slate-400 font-tech flex items-center gap-2 text-xs">
                            <Lock className="w-3 h-3" />
                            READ-ONLY MODE. AUTHENTICATION REQUIRED.
                        </span>
                    </div>
                )}
            </div>
        </CyberCard>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-cyber-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-cyber-dark border border-cyber-primary shadow-[0_0_50px_rgba(6,182,212,0.2)] relative overflow-hidden transition-all">
                {/* Decorative lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-cyber-primary" />
                <div className="absolute bottom-0 right-0 w-full h-1 bg-cyber-primary" />
                
                <div className="p-8">
                    <div className="text-center mb-8">
                        <Shield className="w-12 h-12 text-cyber-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-display font-bold text-white mb-2">IDENTIFICATION REQUIRED</h3>
                        <p className="text-slate-400 font-tech">Select your protocol to access the network.</p>
                    </div>

                    {loginStep === 'select' && (
                        <div className="space-y-4 animate-in slide-in-from-right-10 fade-in duration-300">
                            <button 
                                onClick={() => setLoginStep('github-input')}
                                className="w-full flex items-center justify-center gap-3 p-4 bg-cyber-gray/50 hover:bg-cyber-primary hover:text-cyber-black border border-white/10 hover:border-cyber-primary text-white transition-all group"
                            >
                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-display font-bold">CONNECT VIA GITHUB</span>
                            </button>
                            
                            <button 
                                onClick={handleGuestLogin}
                                className="w-full flex items-center justify-center gap-3 p-4 bg-transparent hover:bg-cyber-secondary/20 border border-cyber-gray hover:border-cyber-secondary text-slate-300 hover:text-white transition-all"
                            >
                                <UserIcon className="w-5 h-5" />
                                <span className="font-display font-bold">LOCAL GUEST ACCESS</span>
                            </button>
                        </div>
                    )}

                    {loginStep === 'github-input' && (
                        <div className="space-y-4 animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="relative">
                                <label className="block text-xs font-tech text-cyber-primary mb-2 tracking-widest">GITHUB USERNAME</label>
                                <div className="flex gap-2">
                                     <input 
                                        type="text" 
                                        value={githubInput}
                                        onChange={(e) => setGithubInput(e.target.value)}
                                        className="flex-1 bg-black/50 border border-cyber-gray/50 text-white p-3 font-tech focus:border-cyber-primary focus:outline-none placeholder:text-slate-600"
                                        placeholder="e.g. torvalds"
                                        autoFocus
                                    />
                                    <button 
                                        onClick={handleGithubConnect}
                                        disabled={isLoading || !githubInput}
                                        className="bg-cyber-primary text-black px-4 font-bold disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {authError && (
                                <div className="flex items-center gap-2 text-red-400 text-xs font-tech bg-red-900/20 p-2 border border-red-500/30">
                                    <AlertCircle className="w-3 h-3" />
                                    {authError}
                                </div>
                            )}

                            <button 
                                onClick={() => setLoginStep('select')}
                                className="text-slate-500 hover:text-white flex items-center gap-2 text-xs font-tech mt-4"
                            >
                                <ArrowLeft className="w-3 h-3" /> BACK TO SELECTION
                            </button>
                        </div>
                    )}

                    <div className="mt-8 pt-4 border-t border-white/5 text-center">
                         <button onClick={resetModal} className="text-xs text-slate-500 hover:text-white font-tech tracking-widest">
                            ABORT SEQUENCE
                         </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};