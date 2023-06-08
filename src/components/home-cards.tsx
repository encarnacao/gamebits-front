import { CardProps } from "@/app/page";

export default function Card({ cardProps }: { cardProps: CardProps}) {
  return (
    <div className="flex group items-center transition-all duration-300 bg-slate-800 rounded-lg p-5 max-w-md hover:bg-orange-600">
      <cardProps.icon className="h-16 w-16 transition-all text-orange-500 group-hover:text-white" />
      <div className="ml-6">
        <h1 className="text-slate-400 transition-all text-2xl group-hover:text-slate-200">{cardProps.title}</h1>
        <p>
          {cardProps.description}
        </p>
      </div>
    </div>
  );
}
