import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHistory } from '@/hooks/useHistory';
import { toast } from '@/hooks/use-toast';

const StandoffSection = () => {
  const [text, setText] = useState('');
  const { addToHistory } = useHistory();

  const openStandoff = () => {
    if (text.trim()) {
      addToHistory(text, 'standoff');
    }

    // Try deep link first, then fallback to store
    const deepLink = 'standoff2://';
    const storeLink = 'https://play.google.com/store/apps/details?id=com.axlebolt.standoff2';
    
    // Create a hidden iframe to try the deep link
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = deepLink;
    document.body.appendChild(iframe);

    // Fallback to store after a delay
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(storeLink, '_blank');
    }, 1500);

    toast({
      title: 'Открытие Standoff 2',
      description: 'Если игра не установлена, откроется страница загрузки',
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-orange/20 flex items-center justify-center">
          <Gamepad2 className="w-6 h-6 text-orange" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Standoff</h2>
          <p className="text-sm text-muted-foreground">Запуск игры</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Введите текст (опционально)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
        
        <Button 
          onClick={openStandoff}
          className="w-full bg-orange hover:bg-orange/90 text-foreground font-medium py-6"
        >
          <Gamepad2 className="w-5 h-5 mr-2" />
          Открыть Standoff 2
        </Button>
      </div>
    </div>
  );
};

export default StandoffSection;
