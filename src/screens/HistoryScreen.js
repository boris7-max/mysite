import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Layout from '../components/Layout';
import { copyToClipboard } from '../utils/helpers';

const HistoryScreen = ({ history }) => {
    
    const handleCopy = async (text) => {
        await copyToClipboard(text);
        Alert.alert("Успех", "Текст скопирован в буфер обмена!");
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.listItem}>
            <Text style={styles.textNumber}>{index + 1}.</Text>
            <Text style={styles.listText} numberOfLines={2}>{item}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={() => handleCopy(item)}>
                <Text style={styles.copyButtonText}>Копировать</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Layout title="📚 История Текстов (Стр. 1)">
            {history.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>История пока пуста. Введите текст на первой странице!</Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingBottom: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    textNumber: {
        color: '#A9A9A9',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    listText: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        marginRight: 10,
    },
    copyButton: {
        backgroundColor: '#007BFF', // Синий акцент для кнопки копирования
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginLeft: 'auto',
    },
    copyButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#A9A9A9',
        fontSize: 18,
        textAlign: 'center',
    }
});

export default HistoryScreen;