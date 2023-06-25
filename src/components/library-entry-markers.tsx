import { HeroIcon } from "@/types";

export default function Marker({
  Icon,
  boolean,
}: {
  Icon: HeroIcon;
  boolean: boolean;
}) {
  return (
    <div className={`border ml-2 rounded-full p-1 ${boolean ? "" : "border-dashed opacity-20"}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
}
