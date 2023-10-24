"use client";

import LoginForm from "@/components/login/LoginForm";
import ReduxProvider from "@/store/ReduxProvider";

function page() {
  return (
    <div className="flex border-solid h-screen items-center">
      <ReduxProvider>
        <LoginForm />
      </ReduxProvider>
    </div>
  );
}

export default page;
