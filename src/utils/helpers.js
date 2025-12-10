import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import CryptoJS from 'crypto-js';

// --- Функции Копирования ---
export const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    // В реальном приложении здесь можно добавить Toast-уведомление
    console.log(`Скопировано в буфер: ${text}`);
};

// --- Генерация MD5 ---
export const generateRandomMD5 = () => {
    // Используем текущее время + случайное число для гарантированной уникальности
    const randomString = (new Date()).getTime().toString() + Math.random().toString();
    const hash = CryptoJS.MD5(randomString).toString();
    return hash;
};

// --- Генерация Фейковых Ссылок ---
export const generateFakeLink = (socialMedia) => {
    const uniqueId = Math.random().toString(36).substring(2, 10); // Случайный "хвост"
    let baseUrl = '';

    switch (socialMedia) {
        case 'YouTube':
            // Пример: youtube.com/watch?v=UNIQUEID
            baseUrl = `https://www.youtube.com/watch?v=faked${uniqueId}`;
            break;
        case 'Instagram':
            // Пример: instagram.com/p/UNIQUEID
            baseUrl = `https://www.instagram.com/p/fake_post_${uniqueId}`;
            break;
        case 'Telegram':
            // Пример: t.me/UNIQUEID
            baseUrl = `https://t.me/fake_channel_${uniqueId}`;
            break;
        case 'TikTok':
            // Пример: tiktok.com/@UNIQUEID
            baseUrl = `https://www.tiktok.com/@fake_user_${uniqueId}`;
            break;
        default:
            return '';
    }

    return baseUrl;
};

// --- Открытие Standoff 2 (Страница 1) ---
export const openStandoff2 = async (onNotInstalled) => {
    const appSchema = 'standoff2://'; // Предполагаемая схема для Standoff 2
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.axlebolt.standoff2';
    const appStoreUrl = 'https://apps.apple.com/app/id1359875411';

    try {
        const supported = await Linking.canOpenURL(appSchema);

        if (supported) {
            // Если схема поддерживается, открываем приложение
            await Linking.openURL(appSchema);
        } else {
            // Если приложение не установлено, перенаправляем в магазин
            onNotInstalled(); // Вызываем колбэк для уведомления/перенаправления

            // Выбираем URL магазина в зависимости от платформы (в реальном коде)
            const storeUrl = Platform.OS === 'ios' ? appStoreUrl : playStoreUrl;
            await Linking.openURL(storeUrl);
        }
    } catch (error) {
        console.error("Ошибка при открытии Standoff 2:", error);
        onNotInstalled(); // В случае ошибки также предполагаем, что не установлено
    }
};