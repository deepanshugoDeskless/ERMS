// src/App.js
import React from "react";
import lottie from "lottie-web";
import reactLogo from "../Assets/animation_lnsgnezl.json";
import reactError from "../Assets/animation_lnt675ic.json";
import personScroll from "../Assets/animation_lnt61h6a.json";

export function Loader() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#react-logo"),
      animationData: reactLogo,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 500,
        height: 500,
      }}
    >
      <div id="react-logo" />
    </div>
  );
}


export function Error() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#react-logo"),
      animationData: reactError,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 500,
        height: 500,
      }}
    >
      <div id="react-logo" />
    </div>
  );
}



export function PersonScroll() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#react-logo"),
      animationData: personScroll,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 500,
        height: 500,
      }}
    >
      <div id="react-logo" />
    </div>
  );
}
