import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Expand, Shrink } from 'lucide-react';

import { useState } from 'react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        }
    };

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="ml-auto flex items-center gap-2">
                <button
                    className={`flex items-center gap-2 px-2 py-1 text-sm text-gray-500 transition-colors duration-200 hover:text-gray-900 ${
                        isFullscreen ? 'text-blue-500' : ''
                    }`}
                    onClick={toggleFullscreen}
                >
                    {isFullscreen ? <Shrink className="w-4" /> : <Expand className="w-4" />}
                    <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>
            </div>
        </header>
    );
}
