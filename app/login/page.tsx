import { Suspense } from "react";
import LoginContent from "./LoginContent";
import Loading from "@/app/loading";

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginContent />
    </Suspense>
  );
}