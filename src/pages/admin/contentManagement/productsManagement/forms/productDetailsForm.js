import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProductProp__L1 } from "../../../../../store/reducers/productReducer";

export const ProductDetailsForm = () => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.product) || { description: '\'{"details":"","key_features":"","box_details":"","specifications":""}\'' }
    const [desc, setDesc] = useState(JSON.parse(product.description || '{"details":"","key_features":"","box_details":"","specifications":""}') || {
        details: "",
        key_features: "",
        box_details: "",
        specifications: ""
    })

    const updateL2 = (n, v) => {
        if (desc[n] !== v)
            setDesc({ ...desc, [n]: v })
    }

    useEffect(() => {
        dispatch(updateProductProp__L1({ name: "description", value: JSON.stringify(desc) }))
    }, [desc])

    return (
        <>
            <div className="mb-5 mt-2">
                <h4>Product Details</h4>
                <ReactQuill
                    value={desc.details}
                    onChange={(e) => {
                        updateL2("details", e)
                    }} />
            </div>
            <div className="mb-10 mt-8">
                <h4>Key Features</h4>
                <ReactQuill
                    value={desc.key_features}
                    onChange={(e) => updateL2("key_features", e)}
                />
            </div>
            <div className="mb-10 mt-8">
                <h4>What's In The Box</h4>
                <ReactQuill
                    value={desc.box_details}
                    onChange={(e) => updateL2("box_details", e)}
                />
            </div>
            <div className="mb-10 mt-8">
                <h4>Specifications</h4>
                <ReactQuill
                    value={desc.specifications}
                    onChange={(e) => updateL2("specifications", e)}
                />
            </div>
        </>
    )
}