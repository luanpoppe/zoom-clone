"use client";

import { useParams } from "next/navigation";

export default function Meeting() {
  const params = useParams(); // Automatically provides the dynamic route parameters
  return <div>Meeting Room #{params.id}</div>;
}
