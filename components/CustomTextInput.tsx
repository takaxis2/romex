import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

const CustomTextInput = (props: TextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9A9A9A"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#111',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
});

export default CustomTextInput;
