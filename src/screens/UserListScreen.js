import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TextInput, Alert, Image } from 'react-native';
import jsonData from '../assets/heliverse_mock_data.json';
import { useNavigation } from '@react-navigation/native';

const USERS_PER_PAGE = 10;

const UserCard = ({ user, onAddToTeam }) => (
    <View style={styles.card}>
        <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.userInfo}>
            <Text style={styles.cardTitle}>{user.first_name} {user.last_name}</Text>
            <Text style={styles.userInfoText}>Email: {user.email}</Text>
            <Text style={styles.userInfoText}>Gender: {user.gender}</Text>
            <Text style={styles.userInfoText}>Domain: {user.domain}</Text>
            <Text style={styles.userInfoText}>Availability: {user.available ? 'Available' : 'Not Available'}</Text>
            {user.available && (
                <Button title="Add To Team" onPress={() => onAddToTeam(user)} />
            )}
        </View>
    </View>
);

export const UserListScreen = () => {
    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const [team, setTeam] = useState([]);

    const viewTeamDetails = () => {
        navigation.navigate('TeamDetails', { team });
    };

    useEffect(() => {
        setData(jsonData);
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * USERS_PER_PAGE;
        const endIndex = startIndex + USERS_PER_PAGE;

        const filteredData = data.filter(user => {
            const fullName = `${user.first_name} ${user.last_name}`;
            return (
                fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedDomain === '' || user.domain === selectedDomain) &&
                (selectedGender === '' || user.gender === selectedGender) &&
                (selectedAvailability === '' || (user.available && selectedAvailability === 'available'))
            );
        });

        const usersForCurrentPage = filteredData.slice(startIndex, endIndex);
        setCurrentUsers(usersForCurrentPage);
    }, [currentPage, data, searchQuery, selectedDomain, selectedGender, selectedAvailability]);

    const nextPage = () => {
        if (currentPage * USERS_PER_PAGE < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const addToTeam = (user) => {

        if (!team.some(member => member.domain === user.domain)) {

            setTeam([...team, user]);
            Alert.alert(`${user.first_name} ${user.last_name} has been added to the team.`);
        } else {
            Alert.alert('Error', 'This user is already in the team or the domain is not unique.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.pageIndicator}>Page {currentPage}</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            <Text style={styles.filterLabel}>Filter by:</Text>
            <View style={styles.filters}>

                <TextInput
                    style={styles.filterInput}
                    placeholder="Domain"
                    value={selectedDomain}
                    onChangeText={(text) => setSelectedDomain(text)}
                />

                <TextInput
                    style={styles.filterInput}
                    placeholder="Gender"
                    value={selectedGender}
                    onChangeText={(text) => setSelectedGender(text)}
                />

                <TextInput
                    style={styles.filterInput}
                    placeholder="Availability (available/unavailable)"
                    value={selectedAvailability}
                    onChangeText={(text) => setSelectedAvailability(text)}
                />
            </View>
            <Text style={styles.teamLabel}>Team Members:</Text>
            <View style={styles.teamButtonContainer}>
                <Button title="View Team Details" onPress={viewTeamDetails} />
            </View>

            {currentUsers.map((user) => (
                <UserCard key={user.id} user={user} onAddToTeam={addToTeam} />
            ))}
            <View style={styles.paginationButtons}>
                <Button title="Previous Page" onPress={prevPage} disabled={currentPage === 1} />
                <Button title="Next Page" onPress={nextPage} disabled={currentPage * USERS_PER_PAGE >= data.length} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FAF3E0'
    },
    pageIndicator: {
        fontSize: 20,
        marginBottom: 16,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    filters: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    filterInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    paginationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    teamLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    teamList: {
        marginBottom: 16,
    },
    teamMember: {
        backgroundColor: '#ccc',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 8,
    },
    avatarContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userInfo: {
        flex: 1,
    },
    userInfoText: {
        marginBottom: 4,
    },
    teamButtonContainer: {
        marginVertical: 8,
        alignSelf: 'flex-start',
    },
});

export default UserListScreen;
