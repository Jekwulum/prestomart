import {ColoredTextInput} from "../../../../../components/forms";
import {useDispatch, useSelector} from "react-redux";
import {updateProductProp__L1} from "../../../../../store/reducers/productReducer";

export const ProductInventoryForm = (props) => {
    const product = useSelector(state => state.products.product) || {}
    const dispatch = useDispatch()
    console.log("product inventory: ", product)

    const updateL1 = (n, v) => {
        dispatch(updateProductProp__L1({name: n, value: v}))
    }
    return (
        <>
            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <ColoredTextInput label={"Store Warning Quantity"} value={product.store_warning_quantity}
                                  type={"number"}
                                  bgClass={"bg-gray-100"}
                                  onChange={(e) => updateL1("store_warning_quantity", e.target.value)}/>
                <ColoredTextInput label={"Store Quantity"} value={product.store_quantity} bgClass={"bg-gray-100"}
                                  disabled={true}/>
            </div>
            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <ColoredTextInput label={"Warehouse Warning Quantity"} value={product.warehouse_warning_quantity}
                                  bgClass={"bg-gray-100"}
                                  onChange={(e) => updateL1("warehouse_warning_quantity", e.target.value)}
                                  type={"number"}/>
                <ColoredTextInput label={"Warehouse Quantity"} value={product.warehouse_quantity}
                                  bgClass={"bg-gray-100"} disabled={true}/>
            </div>
        </>
    )
}