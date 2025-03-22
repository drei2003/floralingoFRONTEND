import Heading from '@/components/heading';
import { AppContent } from '@/components/app-content'; // Import the AppContent component
import { type PropsWithChildren } from 'react';

export default function PageLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <AppContent> {/* Wrap the content within AppContent */}
            <div className="px-4 py-6">
                <Heading title="Settings" description="Manage your profile and account settings" />
            </div>
        </AppContent>
    );
}

