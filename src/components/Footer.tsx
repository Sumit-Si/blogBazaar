import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Button } from './ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
    {
        href: 'https://facebook.com/sumitsingh',
        Icon: Facebook,
        label: 'Facebook Page',
    },
    {
        href: 'https://instagram.com/sumitsingh',
        Icon: Instagram,
        label: 'Instagram',
    },
    {
        href: 'https://linkedin.com/in/sumitsingh',
        Icon: Linkedin,
        label: 'Linkedin',
    },
    {
        href: 'https://youtube.com/sumitsingh',
        Icon: Youtube,
        label: 'Youtube channel',
    },
] as const;

const Footer = ({className, ...props}: React.ComponentProps<'footer'>) => {
  return (
    <footer className={cn('border-t', className)} {...props}>
        <div className='container py-8 grid max-md:justify-items-center md:grid-cols-[1fr_3fr_1fr] md:items-center'>
            <Logo />

            <p className='text-muted-foreground order-1 max-md:text-center md:order-none md:justify-self-center'>
                &copy; {new Date().getFullYear()} Sumit Singh. All rights reserved.
            </p>

            <ul className='flex items-center gap-1 max-md:mt-6 max-md:mb-4 md:justify-self-end'>
                {
                    SOCIAL_LINKS.map(({href,Icon,label}) => (
                        <li key={href}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant={'ghost'} size={'icon'} aria-label={label} asChild>
                                        <a href={href} target='_blank'>
                                            <Icon />
                                        </a>
                                    </Button>
                                </TooltipTrigger>

                                <TooltipContent>{label}</TooltipContent>
                            </Tooltip>
                        </li>
                    ))
                }
            </ul>
        </div>
    </footer>
  );
};

export default Footer;
