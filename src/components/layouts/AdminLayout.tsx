import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import TopAppBar from '@/components/TopAppBar';

const AdminLayout = () => {
  return (
    <SidebarProvider>
        <AppSidebar />

        <SidebarInset className='relative max-h-[calc(100dvh-16px)] overflow-auto'>
            <TopAppBar />
        </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
