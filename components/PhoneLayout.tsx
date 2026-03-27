"use client";

export default function PhoneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="w-[375px] h-[700px] bg-white rounded-[40px] shadow-2xl border-4 border-black overflow-hidden flex flex-col">
        
        {/* Status bar */}
        <div className="h-6 bg-black text-white text-xs flex justify-between px-3 items-center">
          <span>9:41</span>
          <span>📶 🔋</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}