import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {Link, Outlet, useParams} from "react-router-dom";
import {HorizontalTrackComponent} from "../../../components/track";

const CategoriesLayout = () => {
    const {category, slug} = useParams()

    return (
        <>
            <HorizontalTrackComponent className="py-3 flex flex-row w-full items-center px-2 text-sm font-light max-w-7xl mx-auto overflow-x-scroll">
                <Link to={"/home"} className="pr-1">Home</Link>
                {
                    category ?
                        <>
                            <ChevronRightIcon className={"w-4 h-4 mr-1"}/>
                            <Link to={"/categories/" + category} className="pr-1 capitalize w-fit">{category}</Link>
                        </> : null
                }
                {
                    slug ?
                        <>
                            <ChevronRightIcon className={"w-4 h-4 mr-1"}/>
                            <Link to={`/categories/${category}/product/${slug}`} className="capitalize w-fit text-clip">{slug}</Link>
                        </> : null
                }
            </HorizontalTrackComponent>

            <Outlet />
        </>
    )
}
export default CategoriesLayout