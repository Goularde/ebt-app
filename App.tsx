import React from "react";
import { UserContextProvider } from "./context/UserContext";
import Index from "./Index"

export default function App() {
  return (
    <UserContextProvider>
      <Index />
    </UserContextProvider>
  );
}
