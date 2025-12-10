import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import Layout from '../components/Layout';
import { openStandoff2 } from '../utils/helpers';

const StandoffOpener = ({ onAddText }) => {
    const [inputText, setInputText] = useState('');

    const handlePress = async () => {
        if (inputText.trim()) {
            // 1. Добавляем текст в историю
            onAddText(inputText.trim());
            setInputText(''); // Очищаем поле ввода
        }

        // 2. Открываем Standoff 2
        await openStandoff2(() => {
            // Колбэк, если не установлено
            Alert.alert(
                "Standoff 2 не установлен",
                "Вы будете перенаправлены на страницу установки в магазине приложений.",
                [{ text: "OK" }]
            );
        });
    };

    return (
        <Layout title="🎮 Открытие Standoff 2">
            <TextInput
                style={styles.input}
                placeholder="Введите текст для истории..."
                placeholderTextColor="#A9A9A9"
                value={inputText}
                onChangeText={setInputText}
                multiline={true}
            />
            <Button
                title="Открыть Standoff 2"
                onPress={handlePress}
                color={Platform.OS === 'android' ? '#FF4500' : '#FF4500'} // Яркий акцент
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 120,
        backgroundColor: '#333333',
        borderRadius: 8,
        padding: 15,
        marginBottom: 30,
        color: '#FFFFFF',
        fontSize: 16,
        textAlignVertical: 'top', // Для multiline на Android
    },
});

export default StandoffOpener;