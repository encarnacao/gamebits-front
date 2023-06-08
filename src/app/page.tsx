import Image from "next/image";
import HiFiRush from "../assets/hifirush.jpg";
import Header from "@/components/header";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">
        <div className="relative">
          <Image
            priority={false}
            src={HiFiRush}
            alt="Hi-Fi Rush"
            className="max-w-full"
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent'></div>
          <div className="absolute inset-0 gradient-background"></div>
        </div>
        <Header className='absolute top-4' />
    </main>
  );
}