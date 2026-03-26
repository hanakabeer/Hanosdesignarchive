import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f1320] text-[#f6f6f4]">
      <div className="text-center">
        <div className="flex justify-center mb-6 text-yellow-500">
          <AlertTriangle size={64} strokeWidth={1} />
        </div>
        <h1 className="text-6xl font-display font-bold mb-4">404</h1>
        <p className="text-xl text-white/60 mb-8 font-light">The page you are looking for has been moved or deleted.</p>
        <Link href="/">
          <a className="inline-block px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full uppercase tracking-widest text-sm font-medium">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}
