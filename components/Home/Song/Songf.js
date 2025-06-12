import React, { useCallback, useRef } from "react";
import { View, Text } from "react-native";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

export default function Songf() {
  const soundRef = useRef(null);
  const timerRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const play60Seconds = async () => {
        // Unload old sound if needed
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
        }

        // Load and play sound
        const { sound } = await Audio.Sound.createAsync(
          require("./../../../audio/Zara Zara Mehekta Hai (PenduJatt.Com.Se).mp3")
        );
        soundRef.current = sound;
        await sound.playAsync();

        // Stop after 60 seconds
        timerRef.current = setTimeout(async () => {
          if (soundRef.current) {
            await soundRef.current.stopAsync();
          }
        }, 60000); // 60,000 ms = 60 seconds
      };

      play60Seconds();

      return () => {
        isActive = false;
        if (soundRef.current) {
          soundRef.current.unloadAsync();
        }
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [])
  );

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></View>
  );
}
