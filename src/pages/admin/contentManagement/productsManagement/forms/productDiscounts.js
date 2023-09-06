import {ColoredSelect, ColoredTextArea, ColoredTextInput} from "../../../../../components/forms";
import {Button, ButtonGroup, LinkButton} from "../../../../../components/buttons";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setDiscount, updateDiscounts} from "../../../../../store/reducers/productReducer";
import {
    createDiscountServer,
    deleteDiscountServer,
    fetchProducts,
    toggleDiscountServer
} from "../../../../../store/actions/productActions";
import {useState} from "react";
import {toast} from "react-toastify";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";

export const ProductDiscounts = () => {
    const {slug} = useParams()
    const state = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        desc: "",
        percentage: "",
        active: "false"
    })

    const createDiscount = () => {
        toast.promise(
            createDiscountServer(slug, formData), {
                pending: "Creating discount!",
                success: "New Discount created!"
            }
        ).then(() => {
            setFormData({
                desc: "",
                percentage: "",
                active: "false"
            })
            fetchProducts(state.page, state.limit)
                .then(
                    result => {
                        dispatch(updateDiscounts(result.data[result.data.findIndex(product => product.slug === state.product.slug)].discount))
                    }
                )
        })
    }

    const updateDiscount = (n, v) => dispatch(setDiscount({name: n, value: v}))

    return (
        <>
            <div className="mb-10 mt-8">
                <ColoredTextArea value={formData.desc}
                                 onChange={(e) => setFormData({...formData, "desc": e.target.value})} type={"file"}
                                 label={"Product Discount Description"} bgClass={"bg-gray-100"}/>
            </div>
            <div className="mb-2 mt-8 grid grid-cols-2 gap-2">
                <ColoredTextInput value={formData.percentage}
                                  onChange={(e) => setFormData({...formData, "percentage": e.target.value})}
                                  type={"number"}
                                  label={"Discount Percentage"} bgClass={"bg-gray-100"}/>
                <ColoredSelect value={formData.active}
                               onChange={(e) => setFormData({...formData, "active": e.target.value})} label={"Active"}
                               bgClass={"bg-gray-100"}>
                    <option value={"false"}>False</option>
                    <option value={"true"}>True</option>
                </ColoredSelect>
            </div>

            <div className="w-full flex flex-row justify-end mb-4">
                <Button size={"sm"} text={"Save"} bg={"blue"} color={"white"} onClick={createDiscount}
                        className={" ml-auto"}/>
            </div>

            <div className="w-full overflow-y-scroll border-b" style={{maxHeight: "300px"}}>
                <table className="table-auto w-full">
                    <thead className="bg-gray-300 ">
                    <tr className={"text-left border-b border-slate-800"}>
                        <th className="py-2 font-medium pl-1">ID</th>
                        <th className="py-2 font-medium">Description</th>
                        <th className="py-2 font-medium">Percentage</th>
                        <th className="py-2 font-medium text-center">Active</th>
                        <th className="py-2 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody className={"overflow-y-scroll"}>
                    {
                        (state.product.discount || []).map((i, k) =>
                            <ProductDiscountRow key={k} id={i.product_discount_id} description={i.desc}
                                                percentage={i.discount_percentage} active={i.discount_active}/>
                        )
                    }
                    </tbody>
                </table>
            </div>

            <div className="w-full px-4 pb-2 bg-white mt-2">
                <LinkButton location={"/admin/content/products"} size={"sm"} text={"Close"} bg={"red"}
                            color={"white"}/>
            </div>
        </>
    )
}

export const ProductDiscountRow = ({id, description, percentage, active}) => {
    const state = useSelector(state => state.products)
    const dispatch = useDispatch()

    const deleteDiscount = (_id, description) => {
        toast.promise(deleteDiscountServer(state.product.slug, _id),
            {
                pending: "Deleting discount...",
                success: "Discount successfully deleted!"
            })
            .then(() => {
                fetchProducts(state.page, state.limit)
                    .then(
                        result => {
                            dispatch(updateDiscounts(result.data[result.data.findIndex(product => product.slug === state.product.slug)].discount))
                        }
                    )
            })
    }

    const toggleDiscount = (_id, description) => {
        toast.promise(toggleDiscountServer(_id), {
            pending: `Toggling ${description}...`,
            success: `Toggled ${description}!`
        })
            .then(() => {
                fetchProducts(state.page, state.limit)
                    .then(
                        result => {
                            dispatch(updateDiscounts(result.data[result.data.findIndex(product => product.slug === state.product.slug)].discount))
                        }
                    )
            })
    }
    return (
        <tr className={"border-b border-slate-200 text-sm"}>
            <td className="py-4 pb-2 pl-1">{id}</td>
            <td className="py-4 pb-2">{description}</td>
            <td className="py-4 pb-2">{percentage}%</td>
            <td className={"py-4 pb-2"}>
                <span onClick={() => toggleDiscount(id, description)}
                      className={"w-full flex justify-center items-center"}>
                    {active ?
                        <CheckCircleIcon className={"w-5 h-5"}/> :
                        <XCircleIcon className={"w-5 h-5"}/>
                    }
                </span>
            </td>
            <td className="py-4 pb-2">
                <ButtonGroup>
                    <Button onClick={() => deleteDiscount(id, description)} text={"Delete"} size={"sm"} bg={"red"}/>
                </ButtonGroup>
            </td>
        </tr>
    )
}