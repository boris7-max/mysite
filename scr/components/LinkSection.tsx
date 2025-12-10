import { useState } from 'react';
import { Link2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateFakeLink, Platform, platformConfig } from '@/lib/linkGenerator';
import { toast } from '@/hooks/use-toast';

const LinkSection = () => {
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const link = generateFakeLink(platform);
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast({
        title: 'Скопировано!',
        description: 'Ссылка скопирована в буфер обмена',
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
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Link2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ссылки</h2>
          <p className="text-sm text-muted-foreground">Генератор фейковых ссылок</p>
        </div>
      </div>

      <div className="space-y-4">
        <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
          <SelectTrigger className="bg-secondary border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {Object.entries(platformConfig).map(([key, config]) => (
              <SelectItem key={key} value={key} className="text-foreground hover:bg-secondary">
                <span className="flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span>{config.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={handleGenerate}
          className={`w-full font-medium py-6 ${platformConfig[platform].color} hover:opacity-90 text-foreground`}
        >
          Сгенерировать
        </Button>

        {generatedLink && (
          <div className="bg-secondary rounded-lg p-4 flex items-center justify-between gap-3">
            <p className="text-sm text-foreground break-all flex-1">{generatedLink}</p>
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

export default LinkSection;
