// components/SkeletonItem.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { moderateScale } from "react-native-size-matters";

const SkeletonItem = () => {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        loop: true,
        type: "timing",
        duration: 1700,
      }}
      style={styles.skeletonBox}
    />
  );
};

const styles = StyleSheet.create({
  skeletonBox: {
    width: moderateScale(120),
    height: moderateScale(160),
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginRight: moderateScale(10),
  },
});

export default SkeletonItem;
