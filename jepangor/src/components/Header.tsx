import { FaFlask, FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="pt-20 pb-12 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <FaFlask size="3em" color="white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Little Alchemy 2 Recipe Finder</h1>
          <div className="flex items-center justify-center space-x-2 text-lg font-light">
            <FaSearch color="var(--accent)" size="1em" />
            <p className="text-[var(--accent)]">
              Temukan recipe untuk membuat elemen dalam permainan Little Alchemy 2
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Pill icon="🔍" text="BFS" />
            <Pill icon="🧠" text="DFS" />
            <Pill icon="⚡" text="Bidirectional" />
            <Pill icon="🧪" text="720+ Elemen" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Pill({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm font-medium">
      <span className="mr-1">{icon}</span>
      <span>{text}</span>
    </div>
  );
}