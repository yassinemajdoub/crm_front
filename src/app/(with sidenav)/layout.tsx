import SideNav from "@/components/shared/SideNav";
import TopNav from "@/components/shared/TopNav";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex">
                <SideNav />
                <main className="main-margin-left w-full">
                    <TopNav />
                    <div style={{ paddingTop: '20px' }}> 
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
