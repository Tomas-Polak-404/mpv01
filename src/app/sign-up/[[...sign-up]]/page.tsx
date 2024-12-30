"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignUpPage() {
  const { user } = useUser(); // Hook pro získání aktuálního uživatele

  useEffect(() => {
    if (user) {
      console.log("User information:", user); // Ověření, zda máme přístup k uživatelským informacím

      const createUser = async () => {
        try {
          // Odesílání dat uživatele do backendu pro přidání do databáze
          const response = await fetch("/api/users/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id, // Clerk ID
              username: user.username || user.primaryEmailAddress?.emailAddress, // Použití username nebo emailu
            }),
          });

          if (response.ok) {
            console.log("User successfully created in the database!");
          } else {
            console.error("Failed to create user:", await response.json());
          }
        } catch (error) {
          console.error("Error creating user:", error);
        }
      };

      createUser();
    }
  }, [user]);

  return (
    <div className="h-[calc(100vh-96px)] flex items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white", // Custom styles
          },
        }}
        redirectUrl={null} // Nastavení, aby se nezobrazovalo přesměrování po registraci
      />
    </div>
  );
}
