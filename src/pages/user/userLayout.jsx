import 'react-tabs/style/react-tabs.css';
import CheckIfLoggedIn from "../../helpers/checkIfLoggedIn";
import {Link, Outlet, useLocation} from "react-router-dom";
import {HorizontalTrackComponent} from "../../components/track";
import {user_accounts_url, user_orders_url, user_saved_items_url} from "../../helpers/strings";

const UserLayout = () => {
    const {pathname} = useLocation();

    return (
        <>
            <CheckIfLoggedIn/>
            <div className="block lg:hidden">
                <HorizontalTrackComponent className="">
                    <Link
                        className={"py-2 px-4 capitalize break-normal transition duration-300 whitespace-nowrap " + (pathname === user_accounts_url ? "text-white bg-[#D13D19]" : null)}
                        to={"/user/account"}>Account Details</Link>
                    <Link
                        className={"py-2 px-4 capitalize break-normal transition duration-300 whitespace-nowrap " + (pathname === user_orders_url ? "text-white bg-[#D13D19]" : null)}
                        to={"/user/orders"}>Orders</Link>
                    <Link
                        className={"py-2 px-4 capitalize break-normal transition duration-300 whitespace-nowrap " + (pathname === user_saved_items_url ? "text-white bg-[#D13D19]" : null)}
                        to={"/user/saved-items"}>Saved Items</Link>
                </HorizontalTrackComponent>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                <div className="hidden col-span-2 overflow-hidden lg:block flex flex-col bg-white rounded-lg mb-4 h-fit">
                    <Link
                        className={"py-4 px-4 block capitalize break-normal transition duration-300 whitespace-nowrap " + (pathname === user_accounts_url ? "text-white bg-[#D13D19]" : null)}
                        to={"/user/account"}>Account Details</Link>
                    <Link
                        className={"py-4 px-4 block capitalize break-normal transition duration-300 whitespace-nowrap " + (pathname === user_orders_url ? "text-white bg-[#D13D19]" : null)}
                        to={"/user/orders"}>Orders</Link>
                    <Link
                        className={"py-4 px-4 block capitalize break-normal transition duration-300 whitespace-nowrap " + (pathname === user_saved_items_url ? "text-white bg-[#D13D19]" : null)}
                        to={"/user/saved-items"}>Saved Items</Link>
                </div>

                <div className="col-span-5 bg-white px-4 py-4 rounded-lg mb-8">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default UserLayout