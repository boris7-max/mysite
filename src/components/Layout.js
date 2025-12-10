import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const Layout = ({ title, children }) => (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1E1E1E', // Темный фон для современного стиля
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF', // Белый текст
        marginBottom: 30,
        textAlign: 'center',
    },
});

export default Layout;