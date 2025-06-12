import { View } from "react-native";

import CategoryItem from "./CategoryItem";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CategoryList = () => {
  return (
    <View>
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
