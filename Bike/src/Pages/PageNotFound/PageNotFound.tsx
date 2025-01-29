import Lottie from "lottie-react";
import animationData from "@Assets/json/not_found.json";

const NotFoundPage = () => {
  return (
    <div style={{ width: "800px" }}>
      <div
        style={{
          marginLeft: "300px",
          marginTop: "50px",
          height: "750px",
          width: "750px",
        }}
      >
        <Lottie loop={true} autoPlay={true} animationData={animationData} />
      </div>
    </div>
  );
};

export default NotFoundPage;
