import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import CategoryList from "../../components/Home/CategoryList";
import Busness from "../../components/Home/Busness";
import New from "../../new/New";

export default function home() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, height: "100%", paddingBottom: 20, marginBottom: 40 }}
    >
      <Header />
      <View>
        <Slider />
        <CategoryList />
        <Busness />

        <View style={{ height: 10 }}></View>
      </View>
    </ScrollView>
  );
}
