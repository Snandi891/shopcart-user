import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeFromCart,
} from "../../components/redux/actions/Actions";
import RemoveCart from "../../components/Home/RemoveCart";

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
      <View style={{ padding: 30 }}>
        <View></View>
        <Text>Total Price: {totalPrice}</Text>
        <TouchableOpacity style={{ backgroundColor: "red", padding: 20 }}>
          <Text>submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
