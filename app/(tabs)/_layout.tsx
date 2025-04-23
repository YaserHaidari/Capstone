import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '@/lib/firebase';

const AuthHomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setMessage('Verification email sent. Please check your inbox.');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setMessage('Please verify your email before logging in.');
        } else {
          setMessage('Logged in successfully.');
          router.push('/');
        }
      }
    } catch (error: any) {
      setMessage(` ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{mode === 'login' ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Text style={styles.message}>{message}</Text>
      <Button title={mode === 'login' ? 'Login' : 'Sign Up'} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        <Text style={styles.toggleText}>
          {mode === 'login' ? 'No account? Sign up' : 'Have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  message: {
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  toggleText: {
    marginTop: 15,
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});
