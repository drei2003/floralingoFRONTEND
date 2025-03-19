import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
    titleClassName?: string;
    className?: string;
}

export default function AuthLayout({ children, title, description, titleClassName, className }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className={`relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0 ${className}`}>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[410px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        {/* Add logo and label here */}
                        <div className="flex items-center space-x-2 pb-2">
                            <AppLogoIcon className="h-10 w-10" />
                            <span className="text-lg font-bold">FLORALINGO</span>
                        </div>
                        <h1 className={`text-[45px] font-bold ${titleClassName}`}>{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
            <div className="relative hidden h-full flex-col lg:flex dark:border-r">
                <img
                    src="https://images.pexels.com/photos/36445/rose-close-up-pink-flower.jpg"
                    alt="Background"
                    className="absolute inset-0 h-full w-full rounded-[4vw] object-cover p-7"
                />
            </div>
        </div>
    );
}
