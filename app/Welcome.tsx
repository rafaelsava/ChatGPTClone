import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';


export default function Welcome() {
  const [screenIndex, setScreenIndex] = useState(0);
  const router = useRouter();

  const screens = [
    {
      title: 'Examples',
      icon: 'sunny-outline',
      items: [
        '“Explain quantum computing in simple terms”',
        '“Got any creative ideas for a 10-year-old\'s birthday?”',
        '“How do I make an HTTP request in JavaScript?”',
      ],
    },
    {
      title: 'Capabilities',
      icon: 'flash-outline',
      items: [
        'Remembers what user said earlier in the conversation',
        'Allows user to provide follow-up corrections',
        'Trained to decline inappropriate requests',
      ],
    },
    {
      title: 'Limitations',
      icon: 'warning-outline',
      items: [
        'May occasionally generate incorrect information',
        'May occasionally produce harmful instructions or biased content',
        'Limited knowledge of world and events after 2021',
      ],
    },
  ];

  const currentScreen = screens[screenIndex];

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/onlygptlogo.png')} style={styles.logo} />

      <Text style={styles.title}>Welcome to ChatGPT</Text>

      <Text style={styles.subtitle}>Ask anything, get your answer</Text>

      <Icon name={currentScreen.icon} size={24} color="white" style={styles.icon} />

      <Text style={styles.sectionTitle}>{currentScreen.title}</Text>

      <View style={styles.examplesContainer}>
        {currentScreen.items.map((item, index) => (
          <View key={index} style={styles.exampleBox}>
            <Text style={styles.exampleText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.indicatorContainer}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              screenIndex === index ? styles.activeIndicator : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (screenIndex < screens.length - 1) {
            setScreenIndex(screenIndex + 1);
          } else {
            router.replace('/Chat');
          }
        }}
      >
        <Text style={styles.nextButtonText}>
          {screenIndex < screens.length - 1 ? 'Next' : "Let's Chat →"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  examplesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  exampleBox: {
    backgroundColor: '#44454f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exampleText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  indicator: {
    width: 30,
    height: 3,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#10A37F',
  },
  inactiveIndicator: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  nextButton: {
    backgroundColor: '#10A37F',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
