const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Apps', href: '#apps' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50/85 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="text-[1rem] font-extrabold text-gray-900">
          YoungSeok
        </a>
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.875rem] font-bold text-gray-600 transition hover:bg-accent-soft hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
