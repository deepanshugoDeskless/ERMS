import React from "react";
import lottie from "lottie-web";
import reactLogo from "../Assets/animation_lnsgnezl.json";
import reactError from "../Assets/animation_lnt675ic.json";
import personScroll from "../Assets/animation_lnt61h6a.json";
import userAnimation from "../Assets/AnimationUser.json";
import finanaceAnimation from "../Assets/AnimationFinance.json";
import Lottie from "lottie-react";

export function Loader() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#react-logo"),
      animationData: reactLogo,
      renderer: "svg",
      loop: true,
      autoplay: true,
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
      renderer: "svg",
      loop: true,
      autoplay: true,
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
      <Lottie
        animationData={JSON.parse(JSON.stringify(personScroll))}
        height={400}
        width={400}
      />
    </div>
  );
}

export function UserDashboardAnimation() {
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
      <Lottie
        animationData={JSON.parse(JSON.stringify(userAnimation))}
        height={400}
        width={400}
      />
    </div>
  );
}

export function FinanceDashboardAnimation() {
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
      <Lottie
        animationData={JSON.parse(JSON.stringify(finanaceAnimation))}
        height={400}
        width={400}
      />
    </div>
  );
}
