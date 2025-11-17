import React from 'react';
import { Link } from 'react-router-dom';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Avatar from 'react-avatar';
import SettingsDialog from '@/components/SettingsDialog';
import { useLogout } from '@/hooks/useLogout';
import { useUser } from '@/hooks/useUser';
import { ChevronsUpDownIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import SidebarUserMenu from '@/components/SidebarUserMenu';

const SidebarUserMenu = () => {
  const { isMobile } = useSidebar();
  const user = useUser();
  const logout = useLogout();

  if (user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={'lg'}
                className={'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent'}
              >
                <Avatar
                  email={user?.email}
                  size='32'
                  // alt={'S'}
                  className='rounded-sm'
                />

                <div className="grid flex-1 text-left text-sm leading-tight">
                    <div className="truncate font-medium">{user.username}</div>
                    <div className="truncate text-xs">{user.email}</div>
                </div>

                <ChevronsUpDownIcon className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar
                    email={user?.email}
                    size='32'
                    // alt={'S'}
                    className='rounded-lg'
                  />

                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <div className='truncate font-medium'>{user?.username}</div>
                    <div className='truncate text-xs'>{user?.email}</div>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <SettingsDialog>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {/* <Link
                to={'/admin/dashboard'}
                viewTransition
              > */}
                    <SettingsIcon />
                    Settings
                    {/* </Link> */}
                  </DropdownMenuItem>
                </SettingsDialog>

                <DropdownMenuItem onClick={logout}>
                  <Link
                    to={'/admin/dashboard'}
                    viewTransition
                  >
                    <LogOutIcon />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
};

export default SidebarUserMenu;
