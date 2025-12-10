import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Layout from '../components/Layout';
import { generateRandomMD5, copyToClipboard } from '../utils/helpers';

const MD5Generator = () => {
    const [generatedMD5, setGeneratedMD5] = useState('');

    const handleGenerate = async () => {
        const md5Code = generateRandomMD5();
        setGeneratedMD5(md5Code);

        // Копирование в буфер обмена
        await copyToClipboard(md5Code);
        Alert.alert("Успех", "MD5-код скопирован в буфер обмена!");
    };

    return (
        <Layout title="🔑 Генератор MD5">
            <View style={styles.content}>
                {generatedMD5 ? (
                    <View style={styles.md5Container}>
                        <Text style={styles.md5Label}>Случайный MD5-код:</Text>
                        <Text selectable={true} style={styles.md5Text}>{generatedMD5}</Text>
                    </View>
                ) : (
                    <Text style={styles.placeholderText}>Нажмите кнопку, чтобы сгенерировать криптографически корректный MD5-код.</Text>
                )}
            </View>

            <View style={styles.buttonWrapper}>
                <Button
                    title="Сгенерировать MD5"
                    onPress={handleGenerate}
                    color="#FFC107" // Желтый акцент
                />
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1, // Занимает доступное место
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonWrapper: {
        // Убрал фиксированное позиционирование, т.к. Layout и навигация это обрабатывают
    },
    md5Container: {
        width: '100%',
        padding: 20,
        backgroundColor: '#282828',
        borderRadius: 8,
        alignItems: 'center',
    },
    md5Label: {
        color: '#A9A9A9',
        marginBottom: 10,
        fontSize: 16,
    },
    md5Text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    placeholderText: {
        color: '#A9A9A9',
        fontSize: 16,
        textAlign: 'center',
    }
});

export default MD5Generator;