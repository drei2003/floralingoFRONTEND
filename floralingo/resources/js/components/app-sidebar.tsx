import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ChartLine, ClipboardList, CreditCard, Flower, FolderTree, House, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: House,
    },
    
    {
        title: 'Orders',
        href: '/orders',
        icon: ClipboardList,
    },

    {
        title: 'Products',
        href: '/products',
        icon: LayoutGrid,
    },

    {
        title: 'Category',
        href: '/category',
        icon: FolderTree,
    },

    {
        title: 'Flowers',
        href: '/flowers',
        icon: Flower,
    },

    {
        title: 'Payment Options',
        href: '/paymentOptions',
        icon: CreditCard,
    },

    {
        title: 'Sales',
        href: '/sales',
        icon: ChartLine,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Landing page',
        href: '/landingPage',
        icon: Flower,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
