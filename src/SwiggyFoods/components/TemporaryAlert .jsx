import React, { useEffect, useState } from "react";

const TemporaryAlert = ({ message, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="temporary-alert">
      <p>{message}</p>
      <div className="underline"></div>
    </div>
  );
};

export default TemporaryAlert;
