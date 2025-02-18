"use client";

const InteractiveSection = () => {
  // Seznam id všech sekcí, které chceme ovládat.
  const sections = ["privacy", "account", "security", "access", "posts", "activity"];

  const SwitchSettings = (divId: string) => {
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        if (id === divId) {
          element.classList.remove("hidden");
          element.classList.add("relative");
        } else {
          element.classList.add("hidden");
          element.classList.remove("relative");
        }
      }
    });
  };

  return (
    <>
      <button
        onClick={() => SwitchSettings("privacy")}
        className="w-full h-10 flex items-center justify-between hover:bg-gray-800 p-2 rounded-md cursor-pointer"
      >
        <span>Privacy</span>
        <span>&gt;</span>
      </button>
      <button
        onClick={() => SwitchSettings("account")}
        className="w-full h-10 flex items-center justify-between hover:bg-gray-800 p-2 rounded-md cursor-pointer"
      >
        <span>Your account</span>
        <span>&gt;</span>
      </button>
      <button
        onClick={() => SwitchSettings("security")}
        className="w-full h-10 flex items-center justify-between hover:bg-gray-800 p-2 rounded-md cursor-pointer"
      >
        <span>Security</span>
        <span>&gt;</span>
      </button>
      <button
        onClick={() => SwitchSettings("access")}
        className="w-full h-10 flex items-center justify-between hover:bg-gray-800 p-2 rounded-md cursor-pointer"
      >
        <span>Accessibility</span>
        <span>&gt;</span>
      </button>
      <button
        onClick={() => SwitchSettings("posts")}
        className="w-full h-10 flex items-center justify-between hover:bg-gray-800 p-2 rounded-md cursor-pointer"
      >
        <span>Posts</span>
        <span>&gt;</span>
      </button>
      <button
        onClick={() => SwitchSettings("activity")}
        className="w-full h-10 flex items-center justify-between hover:bg-gray-800 p-2 rounded-md cursor-pointer"
      >
        <span>Your activity</span>
        <span>&gt;</span>
      </button>
    </>
  );
};

export default InteractiveSection;
