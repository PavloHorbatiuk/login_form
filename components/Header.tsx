"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setAuth } from "@/store/slices/authSlice";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Header() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);
  return (
    <div className="h-100% shadow-lg  p-2  bg-slate-50">
      <div className=" float-right">
        <Button variant="outlined" onClick={() => dispatch(setAuth(false))}>
          Log out
        </Button>
      </div>
    </div>
  );
}

export default Header;
