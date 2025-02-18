"use client"; // Tato stránka používá React hooky, takže musí být Client Component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface User {
  id: string;
  username: string;
  name: string | null;
  surname: string | null;
}

interface Post {
  id: number;
  desc: string;
  user: {
    username: string;
  };
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Získání vyhledávacího dotazu z URL
  const [results, setResults] = useState<{ users: User[]; posts: Post[] }>({
    users: [],
    posts: [],
  });

  useEffect(() => {
    if (query) {
      // Získání výsledků z API
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {/* Výsledky pro uživatele */}
      <h2 className="text-xl font-semibold mt-6">Users</h2>
      {results.users.length > 0 ? (
        <ul className="mt-2">
          {results.users.map((user) => (
            <li
              key={user.id}
              className="mb-2"
            >
              <span className="text-blue-500">{user.username}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No users found</p>
      )}

      {/* Výsledky pro příspěvky */}
      <h2 className="text-xl font-semibold mt-6">Posts</h2>
      {results.posts.length > 0 ? (
        <ul className="mt-2">
          {results.posts.map((post) => (
            <li
              key={post.id}
              className="mb-4"
            >
              <p>{post.desc}</p>
              <p className="text-sm text-gray-400">By: {post.user.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No posts found</p>
      )}
    </div>
  );
};

export default SearchPage;
