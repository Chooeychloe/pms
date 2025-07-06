"use client";
import { useUser } from "@clerk/nextjs";
import { Patient } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card } from "./ui/card";

interface DataProps {
  data?: Patient;
  type: "create" | "update";
}

export const NewPatient = ({ data, type }: DataProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<any>();
  const router = useRouter();

  const userData = {
    first_name: user?.firstName || "",
    last_name: user?.lastName || "",
    email: user?.emailAddresses[0].emailAddress || "",
    phone: user?.phoneNumbers.toString() || "",
  };
  return <Card className="max-w-6xl- w-full p-4"></Card>;
};
