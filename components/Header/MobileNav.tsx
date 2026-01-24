"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { PrismicNextLink } from "@prismicio/next";
import { Menu, X } from "lucide-react";
import type { LinkField, FieldState } from "@prismicio/client";

type MenuItem = LinkField<string, string, unknown, FieldState, never>;

interface MobileNavContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileNavContext = createContext<MobileNavContextType | null>(null);

interface MobileNavProviderProps {
  children: React.ReactNode;
}

export function MobileNavProvider({ children }: MobileNavProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <MobileNavContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function MobileMenuTrigger() {
  const context = useContext(MobileNavContext);
  if (!context) return null;
  const { isOpen, setIsOpen } = context;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-foreground/10 rounded-md transition-colors"
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
}

interface MobileMenuDrawerProps {
  menuItems: MenuItem[];
}

export function MobileMenuDrawer({ menuItems }: MobileMenuDrawerProps) {
  const context = useContext(MobileNavContext);
  if (!context) return null;
  const { isOpen, setIsOpen } = context;

  return (
    <div
      className={`fixed inset-0 z-100 overflow-hidden lg:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-[280px] max-w-[80vw] bg-[#dcdbd9] shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-foreground/10 rounded-md transition-colors"
            aria-label="Chiudi menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-6">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <PrismicNextLink
                  field={item}
                  className="block py-3 px-4 font-michroma text-lg hover:bg-primary/10 hover:text-primary rounded-md transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
