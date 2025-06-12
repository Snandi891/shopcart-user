import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  useColorScheme,
  Alert,
  Modal,
} from "react-native";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypingAnimation } from "react-native-typing-animation";
import * as Animatable from "react-native-animatable";
import { Audio } from "expo-av";

const API_KEY =
  "5b29bcdec4130cecef03abc4a5c48f0f0cbc179e5aa6e7f0757ec790d2067813";
const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";

export default function App() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");
  const isDark = isDarkMode;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! How can I help you?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
      reaction: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [sound, setSound] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const emojis = ["👍", "❤️", "😂", "😮", "😢", "👏"];

  useEffect(() => {
    const loadUserImage = async () => {
      try {
        const imageUri = await AsyncStorage.getItem("PROFILE_IMAGE");
        if (imageUri) setUserAvatar(imageUri);
      } catch (error) {
        console.log("❌ Failed to load user avatar:", error);
      }
    };

    loadUserImage();
    return () => {
      Speech.stop();
      if (sound) sound.unloadAsync();
    };
  }, []);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const speakText = (text) => {
    setIsSpeaking(true);
    Speech.speak(text, {
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const toggleMusic = async () => {
    if (!sound) {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require("../../audio/Zara Zara Mehekta Hai (PenduJatt.Com.Se).mp3"), // Replace with actual path
        { shouldPlay: true, isLooping: true }
      );
      setSound(loadedSound);
      setMusicPlaying(true);
    } else {
      if (musicPlaying) {
        await sound.pauseAsync();
        setMusicPlaying(false);
      } else {
        await sound.playAsync();
        setMusicPlaying(true);
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      reaction: null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://api.together.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages: [
              ...messages
                .filter((m) => m.sender === "user")
                .map((m) => ({ role: "user", content: m.text })),
              { role: "user", content: userMessage.text },
            ],
          }),
        }
      );

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setIsTyping(false);
      speakText(botReply);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
        reaction: null,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Sorry, something went wrong.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
          reaction: null,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onLongPressMessage = (messageId) => {
    setSelectedMessageId(messageId);
    setEmojiPickerVisible(true);
  };

  const addReaction = (emoji) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessageId ? { ...msg, reaction: emoji } : msg
      )
    );
    setEmojiPickerVisible(false);
    setSelectedMessageId(null);
  };

  const renderMessage = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} useNativeDriver>
      <TouchableOpacity
        onLongPress={() => onLongPressMessage(item.id)}
        style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.botMessage,
          {
            backgroundColor:
              item.sender === "user" ? "#0a84ff" : isDark ? "#333" : "#e5e5ea",
          },
        ]}
      >
        <Image
          source={{ uri: item.sender === "user" ? userAvatar : botAvatar }}
          style={styles.avatar}
        />
        <View style={styles.messageContent}>
          <Text
            style={[styles.messageText, { color: isDark ? "#fff" : "#000" }]}
          >
            {item.text}
          </Text>
          {item.reaction && (
            <Text style={styles.reaction}>{item.reaction}</Text>
          )}
          <Text style={[styles.timestamp, { color: isDark ? "#aaa" : "#555" }]}>
            {item.timestamp}
          </Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>
          Chat Assistant
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMusic} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {musicPlaying ? "⏸️ Music" : "▶️ Music"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={styles.chat}
        data={messages}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderMessage}
      />

      {isTyping && (
        <View style={styles.typingWrapper}>
          <Image source={{ uri: botAvatar }} style={styles.avatar} />
          <TypingAnimation
            dotColor={isDark ? "#ccc" : "#333"}
            dotMargin={5}
            dotAmplitude={3}
            dotSpeed={0.15}
            dotRadius={4}
          />
        </View>
      )}

      <View style={styles.controlsRow}>
        {isSpeaking && (
          <TouchableOpacity
            style={styles.voiceControlButton}
            onPress={stopSpeaking}
          >
            <Text style={styles.voiceControlText}>Stop Speaking</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
              color: isDark ? "#fff" : "#000",
            },
          ]}
          placeholder="Type your message..."
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          editable={!isLoading}
          multiline
        />
        <Button
          title={isLoading ? "..." : "Send"}
          onPress={sendMessage}
          disabled={isLoading}
        />
      </View>

      {/* Emoji Picker Modal */}
      <Modal
        visible={emojiPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEmojiPickerVisible(false)}
      >
        <View style={styles.emojiModal}>
          {emojis.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              onPress={() => addReaction(emoji)}
              style={styles.emojiOption}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chat: { flex: 1, marginBottom: 10 },
  messageContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: "85%",
  },
  userMessage: {
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  botMessage: {
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  reaction: {
    fontSize: 18,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 3,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageContent: {
    flexShrink: 1,
  },
  typingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  voiceControlButton: {
    backgroundColor: "#e33e3e",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  voiceControlText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleButton: {
    backgroundColor: "#007aff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 6,
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emojiModal: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    elevation: 10,
  },
  emojiOption: {
    padding: 8,
    marginHorizontal: 4,
  },
  emoji: {
    fontSize: 24,
  },
});
