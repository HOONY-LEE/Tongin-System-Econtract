import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteUser({ children }: any) {
  // 임시조치 userType에 따라 접근할 수 있는 페이지처리
  // "ADMIN" 이면 관리자 페이지로 라우팅
  // "USER 이면 로그인된 회원으로 메인페이지로 라우팅
  // null 이면 로그아웃 된 상태로 로그인 페이지로 라우팅
  const [userType, setUserType] = useState<"USER" | "ADMIN" | null>("ADMIN");
  if (userType === null) {
    return <Navigate to="/login"></Navigate>;
  } else if (userType === "ADMIN") {
    return <Navigate to="/admin"></Navigate>;
  } else if (userType === "USER") {
    return children;
  }
}
