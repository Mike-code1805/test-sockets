// expoApp.js en tu proyecto de React Native Expo
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Net from 'react-native-tcp';
import { io } from 'socket.io-client';
import axios from 'axios';

const serverAddress = '192.168.1.8'; // Reemplaza con la dirección IP de tu PC
const serverPort = 4040; // Reemplaza con el puerto configurado en el servidor de la PC

const ENDPOINT = 'http://192.168.1.23:4000'; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const selectedChat = {
  isGroupChat: true,
  users: [
    {
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin: false,
      _id: '65cb9372d022b19b04983072',
      name: 'enrique',
      email: 'enri',
      __v: 0,
    },
    {
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin: false,
      _id: '65cb93abd022b19b04983073',
      name: 'Saca',
      email: 'fsd',
      __v: 0,
    },
    {
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin: false,
      _id: '65cb91cfd022b19b04983071',
      name: 'mike',
      email: '123',
      __v: 0,
    },
  ],
  _id: '65cb93b9d022b19b04983074',
  chatName: 'Mike group',
  groupAdmin: {
    pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    isAdmin: false,
    _id: '65cb91cfd022b19b04983071',
    name: 'mike',
    email: '123',
    __v: 0,
  },
  createdAt: '2024-02-13T16:07:21.709Z',
  updatedAt: '2024-02-13T16:58:10.311Z',
  __v: 0,
  latestMessage: {
    readBy: [],
    _id: '65cb9fa25d2730ab0c545603',
    sender: {
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      _id: '65cb91cfd022b19b04983071',
      name: 'mike',
      email: '123',
    },
    content: 'Bien',
    chat: '65cb93b9d022b19b04983074',
    createdAt: '2024-02-13T16:58:10.308Z',
    updatedAt: '2024-02-13T16:58:10.308Z',
    __v: 0,
  },
};

const user = {
  _id: '65cb93abd022b19b04983073',
  name: 'Saca',
  email: 'fsd',
  isAdmin: false,
  pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2I5M2FiZDAyMmIxOWIwNDk4MzA3MyIsImlhdCI6MTcwNzg0MDQyNywiZXhwIjoxNzEwNDMyNDI3fQ.Ocvi0OaH0URu9Wdx-wJpvvKXX1gTw_6h-gNeu1vSNyc',
};

export default function App() {
  const [messageToSend, setMessageToSend] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState('My message new');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', 'user');
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  const sendMessage = async (event) => {
    socket.emit('stop typing', selectedChat._id);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        'http://192.168.1.23:4000/api/message',
        {
          content: newMessage,
          chatId: selectedChat,
        },
        config
      );
      socket.emit('new message', data);
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
      Alert.alert('Error Occured!', 'Failed to send the Message');
    }
  };
  return (
    <View>
      <Text>Enviar mensaje al servidor desde Expo:</Text>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} placeholder='Mensaje' value={messageToSend} onChangeText={(text) => setMessageToSend(text)} />
      <Button title='Enviar' onPress={sendMessage} />
    </View>
  );
}
