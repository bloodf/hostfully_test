import Header from "@/components/Navigation/Header.tsx";
import Footer from "@/components/Navigation/Footer.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
