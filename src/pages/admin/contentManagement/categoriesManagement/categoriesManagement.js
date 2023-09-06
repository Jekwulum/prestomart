import React, {useEffect} from "react";
import {PlainTextInput} from "../../../../components/forms";
import {Button, ButtonGroup, LinkButton, TransparentButton} from "../../../../components/buttons";
import {
    CheckCircleIcon,
    ChevronDownIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import {Outlet} from "react-router-dom";
import {CategoryCardComponent} from "../../../../components/cards/categoryCard.component";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {fetchCategories} from "../../../../store/actions/categoryActions";
import {updateCategories} from "../../../../store/reducers/categoryReducer";

const CategoriesManagement = () => {
    const state = useSelector(state => state.category)

    return (
        <>
            <Outlet/>
            <div className={""}>
                <div className={"mb-4"}>
                    <h4>Product Categories Overview</h4>

                    <div className="w-full flex flex-row justify-end">
                        <PlainTextInput containerClasses={"w-1/2 mr-2"} className={'w-full '}
                                        placeholder={"Subcategory or  subcategory"}
                                        icon={<MagnifyingGlassIcon className={"h-5 w-5"}/>}/>
                        <LinkButton location={"/admin/content/categories/new"} text={"Create New Category"} size={"md"}
                                    color={"#fff"} bg={"#000000"}/>
                        {/*<TransparentButton>*/}
                        {/*    <FunnelIcon className={"w-6 h-6 mr-1"}/>*/}
                        {/*    <span className={"ml-1"}>View Filters</span>*/}
                        {/*    <ChevronDownIcon className={"w-5 h-5"}/>*/}
                        {/*</TransparentButton>*/}
                    </div>
                </div>

                <div className="w-full mb-6 grid grid-cols-2 gap-4">
                    {
                        state.categories.map((i, k) =>
                            <CategoryCardComponent key={k} category={i}/>
                        )
                    }
                </div>

                <div className="w-full flex flex-row">

                </div>
            </div>
        </>
    )
}

export default CategoriesManagement