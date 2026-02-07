import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";
import Image from "next/image";

export default async function Home() {
  const session = await getSession();
  console.log(session);
  return (
    <>
    <HomeClient email={session?.user?.email!} />
    </>
  );
}
