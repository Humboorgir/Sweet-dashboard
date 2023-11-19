import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <nav className="min-h-screen grid grid-cols-[auto,1fr] bg-background text-foreground">
      <Sidebar />
      <div className="fixed w-full h-full ml-[60px]">
        <Header />
        {children}
      </div>
    </nav>
  );
}
