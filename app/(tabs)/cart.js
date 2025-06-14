import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeFromCart,
} from "../../components/redux/actions/Actions";
import RemoveCart from "../../components/Home/RemoveCart";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const cartData = useSelector((state) => state.Reducers);
  const dispatch = useDispatch();
  const totalPrice = cartData.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  console.log("Total Price of All Products:", totalPrice);

  return (
    <View style={{ flex: 1 }}>
      {cartData.length > 0 ? (
        <FlatList
          data={cartData}
          renderItem={({ item, index }) => {
            return (
              <View>
                <RemoveCart
                  item={item}
                  onRemoveItem={() => {
                    dispatch(removeFromCart(index));
                  }}
                  onAddToCart={(x) => {
                    dispatch(addItemToCart(x));
                  }}
                />
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Items Added into the cart</Text>
        </View>
      )}
      <View
        style={{
          padding: moderateScale(30),
          marginBottom: moderateScale(100),
        }}
      >
        <View></View>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Total Price : {totalPrice}
        </Text>
        <Button title="place " />
      </View>
    </View>
  );
};

export default Cart;
