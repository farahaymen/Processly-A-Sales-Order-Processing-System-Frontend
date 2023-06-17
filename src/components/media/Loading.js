import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = (props) => {
  return (
    <ColorRing // source: https://mhnpd.github.io/react-loader-spinner/docs/components/color-ring
      visible={true}
      height="200"
      width="200"
      ariaLabel="loading-arialabel"
      wrapperStyle={{}}
      wrapperClassName="loading-wrapper"
      colors={["#1B9D2C", "#0841C2", "#B0C000", "#BD0105", "#1B9D2C"]} //green, red, blue, yellow, green
    />
  );
};

export default Loading;
