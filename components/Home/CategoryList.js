import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  return (
    <View>
      <View style={{ padding: 10, display: "flex" }}>
        <Text style={{ marginTop: 1, fontSize: 20, fontWeight: "800" }}>
          Category
        </Text>
      </View>
      <CategoryItem />
    </View>
  );
};

export default CategoryList;
