import {useParams} from "react-router-dom";

const Categories = () => {
    const {category} = useParams()

    return(
        <div className={"px-2"}>
            <div className="">
                <div className="text-center">
                    {category} Category
                </div>
            </div>
        </div>
    )
}
export default  Categories