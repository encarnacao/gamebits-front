import Image, { StaticImageData } from "next/image";

export default function GradientImage({ src, alt }:{src:StaticImageData | string, alt:string}) {
  return (
    <div className="relative">
      <Image priority={true} src={src} alt={alt} />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
    </div>
  );
}
