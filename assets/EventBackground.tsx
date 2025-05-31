import { View, StyleSheet } from "react-native";
import Svg, { Circle, Defs, Pattern, Rect } from "react-native-svg";

const EventBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{
          backgroundColor: "#328e6e80",
        }}
      >
        <Defs>
          <Pattern
            id="dot"
            patternUnits="userSpaceOnUse"
            width={20}
            height={15}
            y={5}
          >
            <Circle cx={1} cy={1} r={1} fill="#328e6e" />
          </Pattern>
        </Defs>

        <Rect width="100%" height="100%" fill="url(#dot)" />
      </Svg>
    </View>
  );
};

export default EventBackground;
