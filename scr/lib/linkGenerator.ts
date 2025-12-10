export type Platform = 'youtube' | 'telegram' | 'instagram' | 'tiktok';

const generateRandomString = (length: number, chars: string): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const alphanumericLower = 'abcdefghijklmnopqrstuvwxyz0123456789';

export const generateFakeLink = (platform: Platform): string => {
  switch (platform) {
    case 'youtube':
      // YouTube video ID format: 11 characters
      const videoId = generateRandomString(11, alphanumeric + '-_');
      return `https://youtube.com/watch?v=${videoId}`;
    
    case 'telegram':
      // Telegram username/channel format: 5-32 characters
      const username = generateRandomString(8 + Math.floor(Math.random() * 8), alphanumericLower + '_');
      return `https://t.me/${username}`;
    
    case 'instagram':
      // Instagram post ID format
      const postId = generateRandomString(11, alphanumeric + '-_');
      return `https://instagram.com/p/${postId}`;
    
    case 'tiktok':
      // TikTok video ID format: numeric
      const tiktokId = generateRandomString(19, '0123456789');
      return `https://tiktok.com/@user/video/${tiktokId}`;
    
    default:
      return '';
  }
};

export const platformConfig: Record<Platform, { name: string; color: string; icon: string }> = {
  youtube: { name: 'YouTube', color: 'bg-youtube', icon: '▶️' },
  telegram: { name: 'Telegram', color: 'bg-telegram', icon: '✈️' },
  instagram: { name: 'Instagram', color: 'bg-instagram', icon: '📷' },
  tiktok: { name: 'TikTok', color: 'bg-tiktok', icon: '🎵' },
};
