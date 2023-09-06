import { Button, ButtonGroup, LinkButton } from "../../../../components/buttons";
import { ColoredTextArea, ColoredTextInput, FileUploader } from "../../../../components/forms";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    createNewCategoryServer, createNewSubcategoryServer,
    fetchCategories,
    uploadCategoryImageServer
} from "../../../../store/actions/categoryActions";
import {
    emptyCategory, emptySubcategory, updateCategories,
    updateCategoryProp__L1,
    updateSubcategoryProp__L1
} from "../../../../store/reducers/categoryReducer";
import ReactQuill from "react-quill";

export const NewSubcategory = () => {
    const { product_category_id } = useParams()
    const subcategory = useSelector(state => state.category.subcategory)
    const dispatch = useDispatch()
    const [render, setRender] = useState(false)

    const onSelectFile = (e, idx) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        let formData = new FormData()
        formData.append("image", e.target.files[0])

        toast.promise(uploadCategoryImageServer(formData), {
            pending: "Uploading image...",
            success: "Successfully uploaded image " + idx
        }).then((res) => {
            switch (idx) {
                case 1:
                    dispatch(updateSubcategoryProp__L1({ name: "banner_image", value: res.data.result }))
                    break
                case 2:
                    dispatch(updateSubcategoryProp__L1({ name: "display_image", value: res.data.result }))
                    break
                default:
                    return
            }
        })
    }

    const createNewSubcategory = (t) => {
        toast.promise(createNewSubcategoryServer(subcategory, product_category_id), {
            pending: "Creating new category...",
            success: "New category created!"
        })
            .then(() => {
                fetchCategories()
                    .then(res => {
                        if (t === 1)
                            dispatch(emptySubcategory())
                        else
                            setRender(true)
                        dispatch(updateCategories(res.data))
                    })
            })
    }

    return (
        <div
            className={"h-screen w-full bg-slate-300 fixed bg-opacity-50 z-50 transform -translate-x-3 -translate-y-20 flex justify-center items-center"}>
            {
                render ?
                    <Navigate to={"/admin/content/categories"} />
                    :
                    null
            }
            <div className="w-fit bg-white px-12"
                style={{ minWidth: "656px", height: "500px", maxHeight: "500px" }}>
                <div className="my-4">
                    <h4>New Subcategory</h4>
                </div>

                <div className="overflow-y-scroll border-b scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                    <div className="flex flex-col justify-center mt-4 mb-4">
                        <FileUploader
                            label={`Banner Image`}
                            bgClass={"bg-gray-100"}
                            onFileSelect={(e) => onSelectFile(e, 1)}
                        />
                    </div>

                    <div className="flex flex-col justify-center mb-4">
                        <FileUploader
                            label={`Display Image`}
                            bgClass={"bg-gray-100"}
                            onFileSelect={(e) => onSelectFile(e, 2)}
                        />
                    </div>

                    <div className="mb-4">
                        <ColoredTextInput value={subcategory.name} onChange={e => dispatch(updateSubcategoryProp__L1({
                            name: "name",
                            value: e.target.value
                        }))} label={"Subcategory Name"} />
                    </div>

                    <div className="mb-4">
                        <h4>Description</h4>

                        <ReactQuill
                            value={subcategory.desc}
                            onChange={e => dispatch(updateSubcategoryProp__L1({
                                name: "desc",
                                value: e
                            }))}
                        />
                    </div>
                </div>

                <div className="w-full mt-4">
                    <ButtonGroup className={"justify-end"}>
                        <LinkButton location={"/admin/content/categories"} size={"sm"} text={"Close"} bg={"red"}
                            color={"white"} />
                        <Button onClick={() => createNewSubcategory(1)} size={"sm"} text={"Save & Add Another"} bg={"blue"} color={"white"} />
                        <Button onClick={() => createNewSubcategory(2)} size={"sm"} text={"Save"} bg={"blue"} color={"white"} />
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}