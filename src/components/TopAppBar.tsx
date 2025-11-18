import { Link, useLocation, useNavigation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import TopBarProgress from "@/components/TopBarProgress";

const TopAppBar = ({className, ...props}: React.ComponentProps<'header'>) => {
    const location = useLocation();
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';

  return (
    <header className={cn('relative flex h-16 shrink-0 items-center gap-2 px-4',className)} {...props}>
        <div className="flex items-center gap-2">
            <SidebarTrigger />

            <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
            />

            <AppBreadcrumb />
        </div>

        <div className="flex items-center gap-2 ms-auto">
          {location.pathname !== '/admin/blogs/create' && (
            <Button asChild>
              <Link to={'/admin/blogs/create'} viewTransition>
                <PlusIcon />
                Write a blog
              </Link>
            </Button>
          )}

          <ThemeToggle />
        </div>

        {isLoading && <TopBarProgress />}
    </header>
  )
}

export default TopAppBar