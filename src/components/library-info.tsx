import { LibraryEntry } from "@/types";
import LibraryCard from "./library-card";

export default function LibraryInfo({
  library,
}: {
  library: LibraryEntry[];
}) {
  return (
    <main className="flex flex-col w-3/5 rounded-xl bg-gradient-to-t from-black to-slate-950 mx-auto mt-2">
      {library.map((entry) => (
        <LibraryCard entry={entry} key={`${entry.id}`} />
      ))}
    </main>
  );
}
