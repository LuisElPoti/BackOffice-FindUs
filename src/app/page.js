
"use client";
import React, {useEffect, useState} from "react";
import { useRouter, usePathname } from "next/navigation";


export default function Page() {
  const router = useRouter();
  useEffect(() => {
    console.log('Page mounted');
    router.push('/home');
  }, []);

}