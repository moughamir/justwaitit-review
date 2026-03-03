export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0a0a08] flex items-center justify-center z-[100]">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-aq-blue/20 border-t-aq-blue animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-aq-blue uppercase tracking-widest animate-pulse">
            Anaqio
          </span>
        </div>
      </div>
    </div>
  );
}
