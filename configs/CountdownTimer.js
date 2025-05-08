import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTimeLeftFromTarget = (targetTime) => {
    const now = Date.now();
    const diff = Math.floor((targetTime - now) / 1000);
    return diff > 0 ? diff : 0;
  };

  const initCountdown = async () => {
    try {
      const response = await fetch(
        "https://project-x-five-smoky.vercel.app/api/banner2"
      );
      const data = await response.json();
      const timerData = data[0];

      const hours = parseInt(timerData.hours, 10) || 0;
      const minutes = parseInt(timerData.minutes, 10) || 0;
      const seconds = parseInt(timerData.seconds, 10) || 0;
      const totalSecondsFromAPI = hours * 3600 + minutes * 60 + seconds;

      const storedTargetTime = await AsyncStorage.getItem("targetTime");
      const storedDuration = await AsyncStorage.getItem("duration");

      if (
        !storedTargetTime ||
        !storedDuration ||
        parseInt(storedDuration, 10) !== totalSecondsFromAPI
      ) {
        // Admin changed the timer, or it's first run
        const newTargetTime = Date.now() + totalSecondsFromAPI * 1000;

        await AsyncStorage.setItem("targetTime", newTargetTime.toString());
        await AsyncStorage.setItem("duration", totalSecondsFromAPI.toString());

        setTimeLeft(totalSecondsFromAPI);
        setExpired(false);
      } else {
        // Continue existing timer
        const timeLeft = getTimeLeftFromTarget(parseInt(storedTargetTime, 10));
        setTimeLeft(timeLeft > 0 ? timeLeft : 0);
        setExpired(timeLeft <= 0);
      }
    } catch (error) {
      console.error("Init countdown error:", error);
    }
  };

  useEffect(() => {
    initCountdown();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setExpired(true);
          AsyncStorage.removeItem("targetTime");
          Alert.alert("Timer is over!");
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View
      style={{
        paddingLeft: moderateScale(4),
        paddingRight: moderateScale(4),
        alignItems: "center",
        backgroundColor: "yellow",
        borderRadius: 10,
      }}
    >
      {expired ? (
        <Text style={{ fontSize: 20, color: "red" }}>Timer is over</Text>
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {formatTime(timeLeft)}
        </Text>
      )}
    </View>
  );
};

export default CountdownTimer;
