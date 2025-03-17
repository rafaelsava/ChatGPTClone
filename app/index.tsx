import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/Register'); // Redirige después de 2 segundos
    }, 2000);

    return () => clearTimeout(timeout); // Limpia el timeout si el usuario sale antes
  }, []);

  return (
    <View style={{ backgroundColor: '#343541', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        source={require('../assets/images/chatgptlogo.webp')} 
        style={{ width: '40%', height: '40%', resizeMode: 'contain' }} 
      />
    </View>
  );
}
