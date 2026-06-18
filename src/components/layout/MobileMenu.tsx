import { useState, useEffect, useRef } from 'react'

const HomeIcon = () => (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 17.7327C18 17.9979 17.8946 18.2523 17.7071 18.4398C17.5196 18.6273 17.2652 18.7327 17 18.7327H1C0.734784 18.7327 0.48043 18.6273 0.292893 18.4398C0.105357 18.2523 2.4071e-07 17.9979 2.4071e-07 17.7327V7.22269C-0.000105484 7.07031 0.0346172 6.91991 0.101516 6.78299C0.168415 6.64608 0.26572 6.52626 0.386 6.43269L8.386 0.210694C8.56154 0.0741392 8.7776 0 9 0C9.2224 0 9.43846 0.0741392 9.614 0.210694L17.614 6.43269C17.7343 6.52626 17.8316 6.64608 17.8985 6.78299C17.9654 6.91991 18.0001 7.07031 18 7.22269V17.7327ZM16 16.7327V7.71069L9 2.26669L2 7.71069V16.7327H16Z" fill="currentColor" />
    </svg>
)

const BlogIcon = () => (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20ZM16 18V2H2V18H16ZM5 5H13V7H5V5ZM5 9H13V11H5V9ZM5 13H10V15H5V13Z" fill="currentColor" />
    </svg>
)

const SkillsIcon = () => (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.003 0L18.546 0.00300002L18.548 3.526L13.081 8.992L15.909 11.821L17.324 10.407L18.738 11.821L16.264 14.296L19.092 17.125L17.678 18.539L14.849 15.71L12.374 18.185L10.96 16.771L12.374 15.356L9.545 12.528L6.717 15.356L8.132 16.771L6.718 18.185L4.243 15.71L1.414 18.539L0 17.125L2.829 14.295L0.354 11.821L1.768 10.407L3.182 11.82L6.009 8.992L0.549 3.532L0.546 0L4.092 0.00300002L9.545 5.457L15.003 0ZM7.423 10.406L4.596 13.234L5.304 13.941L8.131 11.113L7.424 10.406H7.423ZM16.547 2.001H15.83L10.96 6.87L11.666 7.577L16.547 2.698V2.001ZM2.547 2.001V2.701L13.788 13.942L14.495 13.235L3.262 2.002L2.547 2.001Z" fill="currentColor" />
    </svg>
)

const ProjectsIcon = () => (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6V2H2V6H18ZM18 8H2V16H18V8ZM1 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM3 9H6V14H3V9ZM3 3H5V5H3V3ZM7 3H9V5H7V3Z" fill="currentColor" />
    </svg>
)

const ContactIcon = () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.455 13L0 16.5V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H16C16.2652 0 16.5196 0.105357 16.7071 0.292893C16.8946 0.48043 17 0.734784 17 1V13H4.455ZM3.763 11H15V2H2V12.385L3.763 11ZM7 15H17.237L19 16.385V6H20C20.2652 6 20.5196 6.10536 20.7071 6.29289C20.8946 6.48043 21 6.73478 21 7V20.5L16.545 17H8C7.73478 17 7.48043 16.8946 7.29289 16.7071C7.10536 16.5196 7 16.2652 7 16V15Z" fill="currentColor" />
    </svg>
)

const SocialIcon = () => (
    <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.841 14.659L14.017 14.836L14.195 14.659C14.4039 14.4501 14.652 14.2843 14.925 14.1713C15.1979 14.0582 15.4905 14 15.786 14C16.0815 14 16.3741 14.0582 16.647 14.1713C16.92 14.2843 17.1681 14.4501 17.377 14.659C17.5859 14.8679 17.7517 15.116 17.8647 15.389C17.9778 15.6619 18.036 15.9545 18.036 16.25C18.036 16.5455 17.9778 16.8381 17.8647 17.111C17.7517 17.384 17.5859 17.6321 17.377 17.841L14.017 21.2L10.659 17.841C10.237 17.419 9.99999 16.8467 9.99999 16.25C9.99999 15.6533 10.237 15.081 10.659 14.659C11.081 14.237 11.6533 14 12.25 14C12.8467 14 13.419 14.237 13.841 14.659ZM8 13V15C6.4087 15 4.88258 15.6321 3.75736 16.7574C2.63214 17.8826 2 19.4087 2 21H0C2.41087e-05 18.9216 0.808937 16.9247 2.25547 15.4323C3.702 13.9398 5.67259 13.069 7.75 13.004L8 13ZM8 0C11.315 0 14 2.685 14 6C14.0006 7.55253 13.3991 9.04479 12.3221 10.163C11.2451 11.2812 9.77646 11.9383 8.225 11.996L8 12C4.685 12 2 9.315 2 6C1.99944 4.44747 2.6009 2.95521 3.67791 1.83699C4.75491 0.718771 6.22354 0.0617214 7.775 0.00399995L8 0ZM8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2Z" fill="currentColor" />
    </svg>
)

const menuItems = [
    { label: 'Home', Icon: HomeIcon, href: '/' },
    { label: 'Blog', Icon: BlogIcon, href: '/blog' },
    { label: 'Skills', Icon: SkillsIcon, href: '#' },
    { label: 'Projects', Icon: ProjectsIcon, href: '#' },
    { label: 'Contact', Icon: ContactIcon, href: '#' },
    { label: 'Social', Icon: SocialIcon, href: '#' },
]

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="menu-wrapper" ref={menuRef}>
            <button
                className="menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
                <div className={`menu-icon-wrapper ${isOpen ? 'is-open' : ''}`}>
                    <svg className="icon-hamburger" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                    <svg className="icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#502AA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <nav className="menu-panel">
                    {menuItems.map((item) => (
                        <a key={item.label} href={item.href} className="menu-item">
                            <span className="menu-icon">
                                <item.Icon />
                            </span>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            )}
        </div>
    )
}