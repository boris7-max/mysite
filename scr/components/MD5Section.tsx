import { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateMD5 } from '@/lib/md5';
import { toast } from '@/hooks/use-toast';

const MD5Section = () => {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const result = generateMD5(text);
    setHash(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!hash) return;
    
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      toast({
        title: 'Скопировано!',
        description: 'MD5 хэш скопирован в буфер обмена',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-green/20 flex items-center justify-center">
          <Hash className="w-6 h-6 text-green" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">MD5</h2>
          <p className="text-sm text-muted-foreground">Генератор хэша</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Введите текст (опционально для случайного хэша)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
        
        <Button 
          onClick={handleGenerate}
          className="w-full bg-green hover:bg-green/90 text-foreground font-medium py-6"
        >
          Сгенерировать MD5
        </Button>

        {hash && (
          <div className="bg-secondary rounded-lg p-4 flex items-center justify-between gap-3">
            <p className="text-sm text-foreground font-mono break-all flex-1">{hash}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="shrink-0 hover:bg-muted"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green" />
              ) : (
                <Copy className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MD5Section;
