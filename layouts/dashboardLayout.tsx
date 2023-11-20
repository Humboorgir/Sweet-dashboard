import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="absolute left-[80px] top-0 right-0 bottom-0">
        <Header />
        {children}
      </div>
    </div>
  );
}
