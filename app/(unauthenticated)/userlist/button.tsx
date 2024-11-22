// ClientComponent.tsx
"use client"; // This marks the component as a Client Component

import React from "react";

interface ButtonProps {
  id: string;
  onclick: (id: string) => void;
}

const Button: React.FC<ButtonProps> = ({ id, onclick }) => {
  return (
    <button
      onClick={() => onclick(id)}
      className="text-blue-500 hover:underline"
    >
      Detail
    </button>
  );
};

export default Button;
