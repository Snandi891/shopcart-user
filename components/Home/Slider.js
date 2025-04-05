import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query } from "@firebase/firestore";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: "800",
          fontSize: 18,
          padding: 10,
          paddingLeft: 20,
        }}
      >
        Offer's for You
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        bounces={false}
        // pagingEnabled={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 160,
              borderRadius: 15,
              marginRight: 15,
            }}
          />
        )}
      />
    </View>

    //
  );
};

export default Slider;
