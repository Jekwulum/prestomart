import React from "react";
import {exclamationMark} from "../../assets";
import {Button, ButtonGroup, LinkButton} from "../buttons";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {toast} from "react-toastify";
import {deleteCategoryServer, deleteSubcategoryServer, fetchCategories} from "../../store/actions/categoryActions";
import {updateCategories} from "../../store/reducers/categoryReducer";
import {useDispatch} from "react-redux";

export const CategoryCardComponent = ({category = {},}) => {
    const dispatch = useDispatch()

    const deleteCategory = (id) => {
        if (window.confirm(`Are you sure you want to do this?\n\nYou are deleting ${category.name} from the database,.\n\n\nThis process is likely irreversible!`)) {
            toast.promise(deleteCategoryServer(id), {
                pending: "Deleting " + category.name,
                success: "Successfully deleted " + category.name
            })
                .then(() => {
                    fetchCategories()
                        .then(res => {
                            dispatch(updateCategories(res.data))
                        })
                })
        }
    }

        const  deleteSubcategory = (id, name) => {
            if (window.confirm(`Are you sure you want to do this?\n\nYou are deleting ${name} from the database,.\n\n\nThis process is likely irreversible!`)) {
                toast.promise(deleteSubcategoryServer(id), {
                    pending: "Deleting " + name,
                    success: "Successfully deleted " + name
                })
                    .then(() => {
                        fetchCategories()
                            .then(res => {
                                dispatch(updateCategories(res.data))
                            })
                    })
            }
        }
    return (
        <div className={"rounded border border-slate-300 py-4 px-2 shadow-lg mr-2 w-full grid grid-cols-9"}
             style={{minHeight: "384px", maxHeight: "384px"}}>
            <div className="rounded border border-slate-300 shadow-lg w-full text-center col-span-4">
                <div className="w-full bg-blue-400 py-4"
                     style={{background: `url(${(process.env.REACT_APP_DEV_CATEGORY_PUBLIC_URL + category.display_image) || exclamationMark.img}) center/cover`}}>
                    <img
                        src={(category.display_image) || exclamationMark.img}
                        alt={category.name || "Subcategory Name"}
                        className={"mb-4 mx-auto w-28 px-4 border"}/>
                </div>

                <h1 className={"font-medium mb-2 px-2"}>{category.name || "Subcategory Name"}</h1>

                <p className={"text-sm mb-4 px-2"}>
                    {category.desc || "Product Subcategory description is supposed to offer up an opportunity to showcase the highlights of a category "}
                </p>

                <ButtonGroup className={"px-2 justify-center"}>
                    <LinkButton location={"/admin/content/categories/edit/" + category.product_category_id}
                                text={"Edit"}
                                bg={"blue"} color={"white"} size={"xs"}/>
                    <Button onClick={() => deleteCategory(category.product_category_id)}
                            text={"Delete"}
                            bg={"red"} color={"white"} size={"xs"}/>
                </ButtonGroup>
            </div>

            <div className="w-full col-span-5 px-2 ">
                <div
                    className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"
                    style={{maxHeight: "300px"}}>
                    <table className="table-auto w-full">
                        <thead>
                        <tr className={"text-left border-b border-slate-800"}>
                            <th className={"pt-4 pb-2 "}>ID</th>
                            <th className={"pt-4 pb-2 "}>Name</th>
                            <th className={"pt-4 pb-2 "}>Active</th>
                            <th className={"pt-4 pb-2 "}>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            category.subcategories.map((item, key) =>
                                <tr key={key} className={"border-b border-slate-200"}>
                                    <td className={"py-4 pb-2 font-medium"}>{item.product_subcategory_id}</td>
                                    <td className="py-4 pb-2">
                                        {item.name}
                                    </td>
                                    <td className="py-4 pb-2">
                                        <CheckCircleIcon className={"w-5 h-5 mx-auto cursor-pointer"}/>
                                    </td>
                                    <td className="py-4 pb-2 pr-1">
                                        <ButtonGroup className={"px-2 justify-center"}>
                                            <LinkButton
                                                location={`/admin/content/categories/edit/${category.product_category_id}/subcategories/edit/${item.product_subcategory_id}`}
                                                text={"Edit"}
                                                bg={"blue"} color={"white"} size={"xs"}/>
                                            <Button onClick={() => deleteSubcategory(item.product_subcategory_id, item.name)}
                                                    text={"Delete"}
                                                    bg={"red"} color={"white"} size={"xs"}/>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

                <LinkButton className={"mt-4 mb-2"}
                            location={`/admin/content/categories/edit/${category.product_category_id}/subcategories/new`}
                            text={"New Subcategory"}
                            bg={"black"} color={"white"} size={"xs"}/>
            </div>
        </div>
    )
}

// CategoryCardComponent.propTypes = {
//     category: PropTypes.object.isRequired,
//     subcategories: PropTypes.array.isRequired
// }