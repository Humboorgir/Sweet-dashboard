import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

import Footer from "@/components/shared/footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[1fr,auto] min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-[auto,1fr]">
        <Sidebar />
        <div>
          <Header />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
