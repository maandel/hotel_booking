"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string | number;
  label: string;
}

export default function MultiSelectDropdown({ 
  name, 
  options, 
  placeholder = "Select options...",
  initialSelected = []
}: { 
  name: string; 
  options: Option[]; 
  placeholder?: string;
  initialSelected?: (string | number)[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<(string | number)[]>(initialSelected);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (val: string | number) => {
    setSelected(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  return (
    <div className="relative w-full" ref={ref}>
      {/* Hidden inputs to submit data in native form submission */}
      {selected.map(val => (
        <input key={val} type="hidden" name={name} value={val} />
      ))}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[50px] bg-background border border-border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer flex justify-between items-center"
      >
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selected.map(val => {
              const opt = options.find(o => o.value === val);
              return (
                <span key={val} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-md font-bold uppercase tracking-wider">
                  {opt?.label}
                </span>
              );
            })
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground ml-2 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl max-h-60 overflow-auto custom-scrollbar p-1 animate-in fade-in zoom-in-95 duration-100">
          {options.length === 0 ? (
            <div className="p-3 text-sm text-muted-foreground text-center">No options available</div>
          ) : (
            options.map(opt => {
              const isSelected = selected.includes(opt.value);
              return (
                <div 
                  key={opt.value} 
                  onClick={() => toggleOption(opt.value)}
                  className={`px-3 py-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors mb-0.5 ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'}`}
                >
                  <span className={`text-sm ${isSelected ? 'font-bold text-foreground' : 'text-foreground/80'}`}>
                    {opt.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-primary" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
