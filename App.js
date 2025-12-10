import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Иконки

// Экраны
import StandoffOpener from './src/screens/StandoffOpener';
import FakeLinkGen from './src/screens/FakeLinkGen';
import MD5Generator from './src/screens/MD5Generator';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    // Состояние для хранения истории текстов (Требование страницы 4)
    const [history, setHistory] = useState([]);

    const addTextToHistory = (text) => {
        // Добавляем новый текст в начало списка
        setHistory(prevHistory => [text, ...prevHistory]);
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // Настройка иконок для нижней навигации
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Standoff') {
                            iconName = focused ? 'game-controller' : 'game-controller-outline';
                        } else if (route.name === 'Links') {
                            iconName = focused ? 'share-social' : 'share-social-outline';
                        } else if (route.name === 'MD5') {
                            iconName = focused ? 'key' : 'key-outline';
                        } else if (route.name === 'History') {
                            iconName = focused ? 'list' : 'list-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    // Общие стили для навигационной панели
                    tabBarActiveTintColor: '#FF4500', // Активный цвет
                    tabBarInactiveTintColor: '#A9A9A9', // Неактивный
                    tabBarStyle: {
                        backgroundColor: '#1E1E1E', // Цвет фона панели
                        borderTopWidth: 0, // Убрать верхнюю границу
                        height: 60, // Увеличить высоту для лучшего вида
                        paddingBottom: 5,
                        paddingTop: 5,
                    },
                    headerShown: false, // Скрываем стандартный заголовок
                })}
            >
                {/* Страница 1: Открытие Standoff 2 */}
                <Tab.Screen name="Standoff">
                    {props => <StandoffOpener {...props} onAddText={addTextToHistory} />}
                </Tab.Screen>

                {/* Страница 2: Генератор фейковых ссылок */}
                <Tab.Screen name="Links" component={FakeLinkGen} />

                {/* Страница 3: Генератор MD5 */}
                <Tab.Screen name="MD5" component={MD5Generator} />

                {/* Страница 4: История текстов */}
                <Tab.Screen name="History">
                    {props => <HistoryScreen {...props} history={history} />}
                </Tab.Screen>

            </Tab.Navigator>
        </NavigationContainer>
    );
}

// Запуск проекта: npx expo start