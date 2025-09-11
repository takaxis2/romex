import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type SocialButtonProps = {
  icon: 'google' | 'apple';
  text: string;
  onPress?: () => void;
};

const ICONS = {
  google: {
    name: 'google' as const,
    color: '#DB4437',
  },
  apple: {
    name: 'apple' as const,
    color: '#000000',
  },
};

const SocialButton = ({ icon, text, onPress }: SocialButtonProps) => {
  const iconProps = ICONS[icon];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesome name={iconProps.name} size={20} color={iconProps.color} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 16,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});

export default SocialButton;
