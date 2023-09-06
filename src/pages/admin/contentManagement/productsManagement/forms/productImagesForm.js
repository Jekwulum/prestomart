import {FileUploader} from "../../../../../components/forms";
import {useDispatch, useSelector} from "react-redux";
import {exclamationMark} from "../../../../../assets";
import {uploadProductImageServer} from "../../../../../store/actions/productActions";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {updateProductProp__L1} from "../../../../../store/reducers/productReducer";

export const ProductImagesForm = () => {
    const product = useSelector(state => state.products.product)
    const {slug} = useParams()
    const dispatch = useDispatch()
    const formData = new FormData()

    const onSelectFile = (e, idx) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        let formData = new FormData()
        formData.append("image", e.target.files[0])

        toast.promise(uploadProductImageServer(formData), {
            pending: "Uploading image...",
            success: "Successfully uploaded image " + idx
        }).then((res) => {
            switch (idx) {
                case 1:
                    dispatch(updateProductProp__L1({name: "image1", value: res.data.result}))
                    break
                case 2:
                    dispatch(updateProductProp__L1({name: "image2", value: res.data.result}))
                    break
                case 3:
                    dispatch(updateProductProp__L1({name: "image3", value: res.data.result}))
                    break
                case 4:
                    dispatch(updateProductProp__L1({name: "image4", value: res.data.result}))
                    break
                default:
                    return
            }
        })
    }

    return (
        <>
            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <div className="flex flex-col justify-center">
                    <FileUploader
                        label={`Image 1 (Default Preview Image)`}
                        bgClass={"bg-gray-100"}
                        onFileSelect={(e) => onSelectFile(e, 1)}
                    />
                </div>

                <div className="">
                    <img
                        src={product.image1 ? (product.image1) : exclamationMark.img}
                        alt={"Image 1 (Default Image)"}
                        className={"w-1/2 mx-auto border"}/>
                </div>
            </div>

            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <div className="flex flex-col justify-center">
                    <FileUploader
                        label={`Image 2 (Required)`}
                        bgClass={"bg-gray-100"}
                        onFileSelect={(e) => onSelectFile(e, 2)}
                    />
                </div>

                <div className="">
                    <img
                        src={product.image2 ? (product.image2) : exclamationMark.img}
                        alt={"Image 2"}
                        className={"w-1/2 mx-auto border"}/>
                </div>
            </div>

            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <div className="flex flex-col justify-center">
                    <FileUploader
                        label={`Image 3`}
                        bgClass={"bg-gray-100"}
                        onFileSelect={(e) => onSelectFile(e, 3)}
                    />
                </div>

                <div className="">
                    <img
                        src={product.image3 ? (product.image3) : exclamationMark.img}
                        alt={"Image 3"}
                        className={"w-1/2 mx-auto border"}/>
                </div>
            </div>

            <div className="mb-10 mt-8 grid grid-cols-2 gap-2">
                <div className="flex flex-col justify-center">
                    <FileUploader
                        label={`Image 4`}
                        bgClass={"bg-gray-100"}
                        onFileSelect={(e) => onSelectFile(e, 4)}
                    />
                </div>

                <div className="">
                    <img
                        src={product.image4 ? (product.image4) : exclamationMark.img}
                        alt={"Image 4"}
                        className={"w-1/2 mx-auto border"}/>
                </div>
            </div>
        </>
    )
}