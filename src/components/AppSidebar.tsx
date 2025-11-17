import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import Logo from '@/components/Logo';
import {
  LayoutDashboard,
  TextIcon,
  MessageSquareIcon,
  UserIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import SidebarUserMenu from '@/components/SidebarUserMenu';

// Constants
const MAIN_MENU = [
  {
    label: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    label: 'Blogs',
    url: '/admin/blogs',
    icon: TextIcon,
  },
  {
    label: 'Comments',
    url: '/admin/comments',
    icon: MessageSquareIcon,
  },
  {
    label: 'Users',
    url: '/admin/users',
    icon: UserIcon,
  },
] as const;

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const location = useLocation();

  return (
    <Sidebar
      variant='inset'
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={'lg'}>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

          <SidebarMenu>
            {MAIN_MENU.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  isActive={location.pathname === item.url}
                  tooltip={item.label}
                  asChild
                >
                    <Link to={item.url} viewTransition>
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
