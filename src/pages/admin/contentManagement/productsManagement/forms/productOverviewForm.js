import { ColoredSelect, ColoredTextInput } from "../../../../../components/forms";
import { useDispatch, useSelector } from "react-redux";
import { updateProductProp__L1 } from "../../../../../store/reducers/productReducer";
import { useEffect } from "react";
import { setCategory } from "../../../../../store/reducers/categoryReducer";

export const ProductOverviewForm = (props) => {
    const product = useSelector(state => state.products.product) || {}
    const categories = useSelector(state => state.category) || {}
    const dispatch = useDispatch()

    console.log("product: ", product)

    useEffect(() => {
        dispatch(setCategory(product.product_category_id))
    }, [])

    const updateL1 = (n, v) => {
        dispatch(updateProductProp__L1({ name: n, value: v }))
    }
    return (
        <>
            <div className="mb-10 mt-8 ">
                <ColoredTextInput label={"Name"} value={product.name} bgClass={"bg-gray-100"}
                    onChange={(e) => updateL1("name", e.target.value)} />
            </div>
            <div className="mb-10 mt-8 ">
                <ColoredTextInput label={"Slug"} bgClass={"bg-gray-100"} disabled={true}
                    value={product.slug} />
            </div>
            <div className="mb-10 mt-8 ">
                <ColoredTextInput label={"SKU"} bgClass={"bg-gray-100"} value={product.sku}
                    onChange={(e) => updateL1("sku", e.target.value)}
                />
            </div>
            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <div className="">
                    <ColoredTextInput label={"Price"} bgClass={"bg-gray-100"} value={product.price}
                        onChange={(e) => updateL1("price", e.target.value)}
                    />
                </div>
                <div className="">
                    <ColoredTextInput label={"Brand"} bgClass={"bg-gray-100"} value={product.brand}
                        onChange={(e) => updateL1("brand", e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <div className="">
                    <ColoredSelect label={"Category"}
                        value={categories.category && categories.category.product_category_id}
                        onChange={(e) => dispatch(setCategory(parseInt(e.target.value)))}
                    >
                        <option>Currently: {product.product_category_name}</option>
                        {categories.categories.map((i, k) =>
                            <option key={k} value={parseInt(i.product_category_id)}>{i.name}</option>
                        )}
                    </ColoredSelect>
                </div>
                <div className=" ">
                    <ColoredSelect label={"Subcategory"}
                        value={product.product_subcategory_id}
                        onChange={(e) => updateL1("product_subcategory_id", parseInt(e.target.value))}
                    >
                        <option>Currently: {product.product_subcategory_name}</option>
                        {categories.category && categories.category.subcategories && categories.category.subcategories.map((i, k) =>
                            <option key={k} value={parseInt(i.product_subcategory_id)}>{i.name}</option>
                        )}
                    </ColoredSelect>
                </div>
            </div>
            <div className="mb-10 mt-8 "><ColoredTextInput label={" Created By"} value={product.admin} disabled={true}
                bgClass={"bg-gray-100"} /></div>
            <div className="mb-10 mt-8 grid grid-cols-3 gap-2">
                <ColoredTextInput disabled={true} value={product.created_at} label={" Created At"}
                    bgClass={"bg-gray-100"} />
                <ColoredTextInput disabled={true} value={product.updated_at} label={" Last Update"}
                    bgClass={"bg-gray-100"} />
                <ColoredTextInput disabled={true} value={product.deleted_at} label={" Deleted At"}
                    bgClass={"bg-gray-100"} />
            </div>
        </>
    )
}