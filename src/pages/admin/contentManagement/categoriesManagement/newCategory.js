import {Button, ButtonGroup, LinkButton} from "../../../../components/buttons";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {
    emptyCategory,
    updateCategories,
    updateCategoryProp__L1,
    updateSubcategoryProp__L1
} from "../../../../store/reducers/categoryReducer";
import {
    createNewCategoryServer,
    fetchCategories,
    uploadCategoryImageServer
} from "../../../../store/actions/categoryActions";
import {useEffect, useState} from "react";
import {ColoredTextArea, ColoredTextInput, FileUploader} from "../../../../components/forms";
import {emptyDiscount} from "../../../../store/reducers/productReducer";
import {Navigate} from "react-router-dom";
import ReactQuill from "react-quill";

export const NewCategory = () => {
    const category = useSelector(state => state.category.category)
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
                    dispatch(updateCategoryProp__L1({name: "banner_image", value: res.data.result}))
                    break
                case 2:
                    dispatch(updateCategoryProp__L1({name: "display_image", value: res.data.result}))
                    break
                default:
                    return
            }
        })
    }

    const createNewCategory = (t) => {
        toast.promise(createNewCategoryServer(category), {
            pending: "Creating new category...",
            success: "New category created!"
        })
            .then(() => {
                fetchCategories()
                    .then(res => {
                        if (t === 1)
                            dispatch(emptyCategory())
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
            <div className="w-fit bg-white px-12 -translate-y-20 "
                 style={{minWidth: "656px",}}>
                <div className="py-4">
                    <h4>New Category</h4>
                </div>

                <div className="overflow-y-scroll border-b scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                    <div className="flex flex-col justify-center mt-4 mb-8">
                        <FileUploader
                            label={`Banner Image`}
                            bgClass={"bg-gray-100"}
                            onFileSelect={(e) => onSelectFile(e, 1)}
                        />
                    </div>

                    <div className="flex flex-col justify-center mb-8">
                        <FileUploader
                            label={`Display Image`}
                            bgClass={"bg-gray-100"}
                            onFileSelect={(e) => onSelectFile(e, 2)}
                        />
                    </div>

                    <div className="mb-8">
                        <ColoredTextInput value={category.name} onChange={e => dispatch(updateCategoryProp__L1({
                            name: "name",
                            value: e.target.value
                        }))} label={"Subcategory Name"}/>
                    </div>

                    <div className="mb-8">
                        <h4>Description</h4>

                        <ReactQuill
                            value={category.desc}
                            onChange={e => dispatch(updateCategoryProp__L1({
                                name: "desc",
                                value: e
                            }))}
                        />
                    </div>
                </div>

                <div className="w-full my-4">
                    <ButtonGroup className={"justify-end"}>
                        <LinkButton location={"/admin/content/categories"} size={"sm"} text={"Close"} bg={"red"}
                                    color={"white"}/>
                        <Button onClick={() => createNewCategory(1)} size={"sm"} text={"Save & Add Another"} bg={"blue"} color={"white"}/>
                        <Button onClick={() => createNewCategory(2)} size={"sm"} text={"Save"} bg={"blue"} color={"white"}/>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}