import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAdmin({ children }: any) {
  const loginUser: { role: 1 | 9 } | null = JSON.parse(
    localStorage.getItem("loginUser") || "{}"
  );
  const role = loginUser ? loginUser.role : null;
  console.log(localStorage.getItem("loginUser"));
  console.log(role);
  if (role === null) {
    return <Navigate to="/login"></Navigate>;
  } else if (role === 1) {
    return <Navigate to="/"></Navigate>;
  } else if (role === 9) {
    return children;
  }
}
