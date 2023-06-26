import { CardProps } from "@/types";

export default function Card({ cardProps }: { cardProps: CardProps}) {
  return (
    <div className="flex group items-center transition-all duration-300 bg-slate-800 rounded-lg p-5 max-w-md hover:bg-orange-600">
      <cardProps.icon className="lg:h-16 lg:w-16 md:w-32 md:h-32 h-16 w-16 transition-all text-orange-500 group-hover:text-white" />
      <div className="ml-6">
        <h1 className="text-slate-400 transition-all lg:text-2xl text-xl group-hover:text-slate-200">{cardProps.title}</h1>
        <p className="text-sm lg:text-base">
          {cardProps.description}
        </p>
      </div>
    </div>
  );
}
