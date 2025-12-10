import { Clock, RefreshCw, Copy, Trash2, Gamepad2, Hash, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHistory, HistoryItem } from '@/hooks/useHistory';
import { toast } from '@/hooks/use-toast';

const getTypeIcon = (type: HistoryItem['type']) => {
  switch (type) {
    case 'standoff':
      return <Gamepad2 className="w-4 h-4 text-orange" />;
    case 'md5':
      return <Hash className="w-4 h-4 text-green" />;
    case 'link':
      return <Link2 className="w-4 h-4 text-primary" />;
  }
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const HistorySection = () => {
  const { history, removeFromHistory, refreshHistory } = useHistory();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Скопировано!',
        description: 'Текст скопирован в буфер обмена',
      });
    } catch {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: string) => {
    removeFromHistory(id);
    toast({
      title: 'Удалено',
      description: 'Запись удалена из истории',
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-orange" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">История</h2>
            <p className="text-sm text-muted-foreground">{history.length} записей</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={refreshHistory}
          className="hover:bg-secondary"
        >
          <RefreshCw className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>История пуста</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="bg-secondary rounded-lg p-4 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="mt-1">{getTypeIcon(item.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground break-all">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(item.timestamp)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(item.text)}
                  className="h-8 w-8 hover:bg-muted"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  className="h-8 w-8 hover:bg-destructive/20"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySection;
