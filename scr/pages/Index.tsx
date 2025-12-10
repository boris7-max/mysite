import { useState } from 'react';
import { Gamepad2, Link2, Hash, Clock } from 'lucide-react';
import StandoffSection from '@/components/StandoffSection';
import LinkSection from '@/components/LinkSection';
import MD5Section from '@/components/MD5Section';
import HistorySection from '@/components/HistorySection';

type Tab = 'standoff' | 'links' | 'md5' | 'history';

const tabs: { id: Tab; icon: typeof Gamepad2; label: string; color: string }[] = [
  { id: 'standoff', icon: Gamepad2, label: 'Standoff', color: 'text-orange' },
  { id: 'links', icon: Link2, label: 'Ссылки', color: 'text-primary' },
  { id: 'md5', icon: Hash, label: 'MD5', color: 'text-green' },
  { id: 'history', icon: Clock, label: 'История', color: 'text-orange' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('standoff');

  const renderContent = () => {
    switch (activeTab) {
      case 'standoff':
        return <StandoffSection />;
      case 'links':
        return <LinkSection />;
      case 'md5':
        return <MD5Section />;
      case 'history':
        return <HistorySection />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold text-foreground text-center">Мультитул</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-secondary' : 'hover:bg-secondary/50'
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? tab.color : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Index;
