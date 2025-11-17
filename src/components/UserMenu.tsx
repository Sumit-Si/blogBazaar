import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Avatar from 'react-avatar';
import useUser from '@/hooks/useUser';
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import useLogout from '@/hooks/useLogout';
import SettingsDialog from '@/components/SettingsDialog';

const UserMenu = () => {
  const user = useUser();
  const logout = useLogout();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={'icon'}
            variant={'ghost'}
          >
            <Avatar
              email={user?.email}
              size='28'
              // alt={'S'}
              className='rounded-sm'
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='min-w-56'
          align='end'
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
            {user?.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link
                  to={'/admin/dashboard'}
                  viewTransition
                >
                  <LayoutDashboardIcon />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}

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
    );
  }
};

export default UserMenu;
