/*
 * Code Attribution:
 * - Varsity College Durban North (2024) MAST HCWAD 2024 Module Manual. Durban: Varsity College.
 *
 *- Sync up sessions 
 */
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TextInput, TouchableHighlight, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './types';
// Define the type for a menu item

export default function MenuScreen() {
  // Define the types for each state variable
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coursetype, setCourse] = useState<string>('');
  const [price, setPrice] = useState<string>(''); // Price can be entered as a string, then converted
  const [errorMessage, setErrorMessage] = useState<string>('');

 const course= ['Salad' , 'Main', 'Desert'];
 
  // Function to handle form submission
  const handleSubmit = () => {
    if (!name || !description || !price) {
      setErrorMessage('All fields are required');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      setErrorMessage('Price must be a number');
      return;
    }

    const newItem: MenuItem = {
      name,
      description,
      coursetype,
      price: priceNumber,
    };

    setMenuItems([...menuItems, newItem]);
    setName('');
    setDescription('');
    setCourse('Salad');
    setPrice('');
    setErrorMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.trackerName}>Nates Diner</Text>
        <Text style={styles.menuHeader}> Chef Menu</Text>
        <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
        <Image 
        source={require('./assets/dinner.jpg')} // Use the correct path to your image
        style={styles.image} 
      />
      </View>

      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listView}
      />

      <View style={styles.userInputView}>
        <Text style={styles.inputLabel}>Add a New Dish</Text>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <Picker
          selectedValue={coursetype}
          onValueChange={(itemValue) => setCourse(itemValue)}
          style={styles.input}
        >
          {course.map((coursetype) => (
            <Picker.Item label={coursetype} value={coursetype} key={coursetype} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Display error message if it exists */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <TouchableHighlight onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

// Define styles as a TypeScript object with specific properties

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1D23', // Navy blue background
  },
  headingContainer: {
    alignItems: 'center',
    marginVertical: 20,
    borderColor: '#32CD32', // Green border
    borderWidth: 5, // Thick border
  },
  trackerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#32CD32', // Green text
  },
  totalItems: {
    fontSize: 16,
    marginVertical: 10,
  },
  listView: {
    flex: 1,
    marginVertical: 20,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#32CD32', // Green border
    borderWidth: 2, // Medium border
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  price: {
    fontSize: 16,
    color: '#27ae60',
    marginTop: 5,
  },
  userInputView: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#32CD32', // Green border
    borderWidth: 2, // Medium border
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#32CD32', // Green border
    borderWidth: 2, // Medium border
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 15,
    marginVertical: 20,
  },
});
