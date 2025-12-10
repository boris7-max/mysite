import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker, Platform, Alert } from 'react-native';
import Layout from '../components/Layout';
import { generateFakeLink, copyToClipboard } from '../utils/helpers';

const socialMediaOptions = ['YouTube', 'Instagram', 'Telegram', 'TikTok'];

const FakeLinkGen = () => {
    const [selectedSocial, setSelectedSocial] = useState(socialMediaOptions[0]);
    const [generatedLink, setGeneratedLink] = useState('');

    const handleGenerate = async () => {
        const link = generateFakeLink(selectedSocial);
        setGeneratedLink(link);
        
        // Автоматическое копирование
        await copyToClipboard(link);
        Alert.alert("Успех", "Фейковая ссылка скопирована в буфер обмена!");
    };

    return (
        <Layout title="🔗 Генератор Фейковых Ссылок">
            <Text style={styles.label}>Выберите социальную сеть:</Text>
            
            {/* Использование Picker для кроссплатформенного Dropdown */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedSocial}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedSocial(itemValue)}
                    itemStyle={styles.pickerItem}
                    mode="dropdown"
                >
                    {socialMediaOptions.map(social => (
                        <Picker.Item key={social} label={social} value={social} />
                    ))}
                </Picker>
            </View>

            <View style={styles.spacer} />

            <Button
                title="Сгенерировать и Копировать"
                onPress={handleGenerate}
                color="#00A86B" // Зеленый акцент
            />

            {generatedLink ? (
                <View style={styles.linkDisplay}>
                    <Text style={styles.linkLabel}>Сгенерированная ссылка:</Text>
                    <Text selectable={true} style={styles.linkText}>{generatedLink}</Text>
                </View>
            ) : null}
        </Layout>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    pickerContainer: {
        backgroundColor: '#333333',
        borderRadius: 8,
        overflow: 'hidden', // Чтобы Picker не выходил за границы
        // На Android Picker должен быть без жестко заданных высот для стилизации
        ...Platform.select({
            ios: {
                height: 40, 
            },
        }),
    },
    picker: {
        color: '#FFFFFF',
    },
    pickerItem: {
        color: '#FFFFFF', // Не всегда работает на всех версиях Android
    },
    spacer: {
        height: 30,
    },
    linkDisplay: {
        marginTop: 40,
        padding: 15,
        backgroundColor: '#282828',
        borderRadius: 8,
    },
    linkLabel: {
        color: '#A9A9A9',
        marginBottom: 5,
        fontSize: 14,
    },
    linkText: {
        color: '#87CEFA', // Светло-голубой для ссылок
        fontSize: 16,
        fontWeight: '500',
    },
});

export default FakeLinkGen;