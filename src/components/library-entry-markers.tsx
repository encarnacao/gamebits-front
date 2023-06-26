import { HeroIcon } from "@/types";

export default function Marker({
  Icon,
  boolean,
}: {
  Icon: HeroIcon;
  boolean: boolean;
}) {
  return (
    <div className={`border md:h-7 h-6 ml-2 rounded-full p-1 ${boolean ? "" : "border-dashed opacity-20"}`}>
      <Icon className="md:w-4 md:h-4 w-3 h-3" />
    </div>
  );
}
