import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonComponent = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: 'white',
    padding: 36,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,

  },
  buttonText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ButtonComponent;