"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  
  const { pending } = useFormStatus();

  return (
    <button className="bg-white p-2 mt-7 rounded-md text-black">{pending ? "Updating..." : "Update"}</button>
  );
};

export default UpdateButton;
