import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from "@/components/Button";
import Text from "@/components/StyledText";
import { router } from 'expo-router';

const colors = {
  prime: '#7412B0',
  default: '#C2C0C3',
  shadow: '#2F366C4D'
}

export default function SignOutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Вы уверены, что хотите выйти?</Text>
      <View style={styles.options}>
        <Button
          text='Нет'
          fontSize={22}
          onPress={() => router.push('/(user)')}
          style={[styles.button, styles.noButton]}
        />
        <Button
          text='Да'
          fontSize={22}
          onPress={() => console.warn('Signing out')}
          style={[styles.button, styles.yesButton]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    color: colors.prime,
    marginBottom: 40
  },

  options: {
    flexDirection: 'row',
  },

  button: {
    width: 120,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  noButton: {
    backgroundColor: colors.default,
    marginRight: 40
  },

  yesButton: {
    backgroundColor: colors.prime
  }
})