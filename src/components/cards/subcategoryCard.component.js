import {useEffect} from "react";
import {exclamationMark} from "../../assets";
import {LinkButton} from "../buttons";

const SubcategoryCardComponent = ({category, subcategory}) => {

    return (
        <LinkButton location={`/categories/${category}/subcategories/${subcategory.name.toLowerCase()}`} className={"flex flex-col items-center justify-center"} color={"#000"}>
            
            <img
                className={"w-16"}
                src={subcategory.display_image ? subcategory.display_image : exclamationMark.img}
                alt={subcategory.name}
            />
            <h4 className={"text-sm py-4"}>{subcategory.name}</h4>
        </LinkButton>
    )
}

export default SubcategoryCardComponent