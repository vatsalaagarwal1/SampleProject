import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TeamDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { team } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Team Details</Text>
            <Text style={styles.subtitle}>Team Members:</Text>
            {team.map((user) => (
                <View key={user.id} style={styles.member}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    </View>
                    <View>
                        <Text style={styles.cardTitle}>{user.first_name} {user.last_name}</Text>
                        <Text>Email: {user.email}</Text>
                        <Text>Gender: {user.gender}</Text>
                        <Text>Domain: {user.domain}</Text>
                        <Text>Availability: {user.available ? 'Available' : 'Not Available'}</Text>
                    </View>
                </View>
            ))}
            {/* Back button */}
            <Button title="Back to User List" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FAF3E0'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    member: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    avatarContainer: {
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TeamDetailsScreen;
