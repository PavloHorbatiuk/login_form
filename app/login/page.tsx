"use client";

import LoginForm from "@/components/login/LoginForm";
import ReduxProvider from "@/store/ReduxProvider";

function page() {
  return (
    <div className="flex  h-screen items-center">
      <ReduxProvider>
        <LoginForm />
      </ReduxProvider>
    </div>
  );
}

export default page;
