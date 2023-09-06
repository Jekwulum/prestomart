import {Link, Outlet, useParams} from "react-router-dom";
import {ChevronRightIcon} from "@heroicons/react/24/outline";

const SubcategoriesLayout = () => {
    const {category, subcategory, slug} = useParams()

    return (
        <>
            <div className="py-3 flex flex-row w-full items-center px-2 text-sm font-light max-w-7xl mx-auto">
                <Link to={"/home"} className="pr-1">Home</Link>
                {
                    category ?
                        <>
                            <ChevronRightIcon className={"w-4 h-4 mr-1"}/>
                            <Link to={"/categories/" + category} className="pr-1 capitalize">{category}</Link>
                        </> : null
                }
                {
                    subcategory ?
                        <>
                            <ChevronRightIcon className={"w-4 h-4 mr-1"}/>
                            <Link to={`/categories/${category}/subcategories/${subcategory}`} className="capitalize">{subcategory}</Link>
                        </> : null
                }
                {
                    slug ?
                        <>
                            <ChevronRightIcon className={"w-4 h-4 mr-1"}/>
                            <Link to={`/categories/${category}/subcategories/${subcategory}/product/${slug}`} className="capitalize">{slug}</Link>
                        </> : null
                }
            </div>

            <Outlet/>
        </>
    )
}
export default SubcategoriesLayout