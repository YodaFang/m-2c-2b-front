"use client"
import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface StickyHeaderProps {
    children: ReactNode; // This will be the main header content
    topHeaderContent: ReactNode; // This will be the TopHeader component
    top?: string;
}

const StickyHeader = ({ children, topHeaderContent, top = '0px' }: StickyHeaderProps) => {
    const headerRef = useRef<HTMLElement>(null);
    const topHeaderRef = useRef<HTMLDivElement>(null);
    const mainHeaderRef = useRef<HTMLDivElement>(null);

    const [isPinned, setIsPinned] = useState(false);
    const [headerStyleTop, setHeaderStyleTop] = useState(top);

    useEffect(() => {
        let prevScrollpos = window.scrollY;

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const header = headerRef.current;
            const topHeader = topHeaderRef.current;
            const mainHeader = mainHeaderRef.current;

            if (!header || !mainHeader) return;

            const topHeaderHeight = topHeader ? topHeader.clientHeight : 0;
            const mainHeaderHeight = mainHeader.clientHeight;
            const totalHeaderHeight = topHeaderHeight + mainHeaderHeight;

            if (prevScrollpos > currentScrollPos && currentScrollPos > topHeaderHeight) {
                setIsPinned(true);
                setHeaderStyleTop(`-${topHeaderHeight}px`);
                document.documentElement.style.setProperty('--header-height', `${mainHeaderHeight}px`);
            } else {
                setIsPinned(false);
                setHeaderStyleTop(`-${totalHeaderHeight}px`);
                document.documentElement.style.setProperty('--header-height', '0px');
            }
            prevScrollpos = currentScrollPos;
        };

        // Initial check on mount
        const header = headerRef.current;
        const topHeader = topHeaderRef.current;
        const mainHeader = mainHeaderRef.current;

        if (header && mainHeader) {
            const topHeaderHeight = topHeader ? topHeader.clientHeight : 0;
            const mainHeaderHeight = mainHeader.clientHeight;
            const totalHeaderHeight = topHeaderHeight + mainHeaderHeight;

            if (window.scrollY > topHeaderHeight) {
                setIsPinned(true);
                setHeaderStyleTop(`${topHeaderHeight}px`);
                document.documentElement.style.setProperty('--header-height', `${mainHeaderHeight}px`);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [top]);

    return (
        <header
            id='header'
            ref={headerRef}
            className={`sticky z-50 top-0 transition-[top] duration-300 ${isPinned ? 'header-pinned' : ''}`}
            style={{ top: headerStyleTop }}
        >
            <div id='top-header' ref={topHeaderRef}>
                {topHeaderContent}
            </div>
            <div ref={mainHeaderRef} className='lg:h-25 h-16 bg-home-bg-1 [.header-pinned_&]:shadow-md'>
                {children}
            </div>
        </header>
    )
}

export default StickyHeader