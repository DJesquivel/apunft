// Loader.tsx
import React from "react";
import { Spin } from "antd";

interface LoaderProps {
  loading: boolean;
  size: "small" | "default" | "large";
}

const Loader: React.FC<LoaderProps> = ({ loading, size }) => {
  if (!loading) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size={size} />
    </div>
  );
};

export default Loader;
