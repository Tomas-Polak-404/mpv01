"use client"; // Tato komponenta používá React hooky, takže musí být Client Component

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Použijte next/navigation místo next/router

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() === "") return;

    // Přesměrování na stránku s výsledky vyhledávání
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="hidden xl:flex p-2 flex-row items-center rounded-xl outline-8 border-[1px] border-gray-600">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <Image
        src="/search.png"
        alt=""
        width={14}
        height={14}
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
