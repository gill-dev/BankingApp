import Link from "next/link";
import Image from "next/image";
import { navLinks } from "config";
import { useRouter } from "next/router";
import { useAuth } from "@sections/auth";
import { useGetCurrentUserQuery } from "@sections/auth";
import { useGetAccountsQuery } from "@sections/account";

function Sidebar() {
    const { } = useGetCurrentUserQuery();
    const { data } = useGetAccountsQuery();
    const { user } = useAuth();
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">

                <Link href="/" passHref>
                    <a className="sidebar-logo">
                        <Image src="/assets/images/logo.svg" alt="logo" width={300} height={50} />
                    </a>
                </Link>
                <div className="flex justify-center items-center  text-active-500">
                    <h1 className="p-18-semibold">{`${user?.firstName} ${user?.lastName}`}</h1>

                </div>

                {data && (
                    <div className="flex justify-center items-center  text-active-500">
                        <h1 className="p-18-semibold">
                            {data[0].accountType}
                        </h1>
                    </div>
                )}
                <nav className="sidebar-nav">
                    <ul className="sidebar-nav_elements">
                        {navLinks.slice(0, 3).map((link) => {
                            const isActive = link.route === pathname;
                            return (
                                <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-active-500 text-white' : 'text-gray-700'}`}>
                                    <Link href={link.route} passHref>
                                        <a className="sidebar-link">
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={24}
                                                height={24}
                                                className={`${isActive && 'brightness-200'}`}
                                            />
                                            {link.label}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="sidebar-nav_elements">
                        {navLinks.slice(3).map((link) => {
                            const isActive = link.route === pathname;
                            return (
                                <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-active-500 text-white' : 'text-gray-700'}`}>
                                    <Link href={link.route} passHref>
                                        <a className="sidebar-link">
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={24}
                                                height={24}
                                                className={`${isActive && 'brightness-200'}`}
                                            />
                                            {link.label}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
