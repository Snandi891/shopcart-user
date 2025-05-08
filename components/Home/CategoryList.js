import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import * as Animatable from "react-native-animatable";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CategoryList = () => {
  return (
    <View>
      <Animatable.View
        animation={"slideInUp"}
        duration={2000}
        style={{
          padding: moderateScale(5),
          marginLeft: moderateScale(5),
          display: "flex",
        }}
      >
        <Text
          style={{
            marginTop: moderateScale(1),
            fontSize: moderateScale(20),
            fontWeight: "800",
          }}
        >
          Category
        </Text>
      </Animatable.View>
      <View
        style={{
          alignItems: "center",
          marginLeft: moderateScale(10),
          marginRight: moderateScale(10),
        }}
      >
        <CategoryItem />
      </View>
    </View>
  );
};

export default CategoryList;
