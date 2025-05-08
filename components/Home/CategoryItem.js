import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Card } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const AnimatedBn = Animatable.createAnimatableComponent(TouchableOpacity);

const CategoryItem = () => {
  const router = useRouter();
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}
    >
      <AnimatedBn
        animation={"slideInUp"}
        duration={2000}
        onPress={() => router.push("/shirt-list/shirt-page")}
      >
        <Card
          style={{
            padding: moderateScale(2),
            margin: moderateScale(5),
            borderRadius: moderateScale(10),
            height: verticalScale(80),
            width: scale(80),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/wave.png")}
            style={{ height: verticalScale(40), width: scale(40) }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: moderateScale(5),
            }}
          >
            Sea
          </Text>
        </Card>
      </AnimatedBn>
      <AnimatedBn
        animation={"slideInUp"}
        duration={2200}
        onPress={() => router.push("/jins-list/jins-page")}
      >
        <Card
          style={{
            padding: moderateScale(2),
            margin: moderateScale(5),
            borderRadius: moderateScale(10),
            height: verticalScale(80),
            width: scale(80),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/mountain.png")}
            style={{ height: verticalScale(40), width: scale(40) }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: moderateScale(5),
            }}
          >
            Mountain
          </Text>
        </Card>
      </AnimatedBn>
      <AnimatedBn
        animation={"slideInUp"}
        duration={2400}
        onPress={() => router.push("/phone-list/phone-page")}
      >
        <Card
          style={{
            padding: moderateScale(2),
            margin: moderateScale(5),
            borderRadius: moderateScale(10),
            height: verticalScale(80),
            width: scale(80),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/forest.png")}
            style={{ height: verticalScale(40), width: scale(40) }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: moderateScale(5),
            }}
          >
            Forest
          </Text>
        </Card>
      </AnimatedBn>
      <AnimatedBn
        animation={"slideInUp"}
        duration={2600}
        onPress={() => router.push("/laptop-list/laptop-page")}
      >
        <Card
          style={{
            padding: moderateScale(2),
            margin: moderateScale(5),
            borderRadius: moderateScale(10),
            height: verticalScale(80),
            width: scale(80),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../Images/temple.png")}
            style={{ height: verticalScale(40), width: scale(40) }}
          />
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: moderateScale(5),
            }}
          >
            Temple
          </Text>
        </Card>
      </AnimatedBn>
    </ScrollView>
  );
};

export default CategoryItem;
