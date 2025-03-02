// components/InteractiveSection.tsx
"use client";

type Section = {
  id: string;
  label: string;
};

const InteractiveSection = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  const sections: Section[] = [
    { id: "privacy", label: "Privacy" },
    { id: "account", label: "Your account" },
    { id: "security", label: "Security" },
    { id: "access", label: "Accessibility" },
    { id: "posts", label: "Posts" },
    { id: "activity", label: "Your activity" },
  ];

  return (
    <>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`w-full h-10 flex items-center justify-between p-2 rounded-md cursor-pointer ${
            activeSection === section.id ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
        >
          <span>{section.label}</span>
          <span>&gt;</span>
        </button>
      ))}
    </>
  );
};

export default InteractiveSection;
