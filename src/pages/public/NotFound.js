import {image404} from "../../assets";
import {LinkButton} from "../../components/buttons";

export const NotFound = () => {

    return (
        <>
            <div
                className="bg-white flex justify-center flex flex-col lg:grid grid-cols-5 px-4 lg:px-12 py-32 w-fit mx-auto">
                <div className="col-span-3">
                    <img src={image404.img} alt={image404.alt} className={"w-11/12 lg:w-1/2 mx-auto"}/>
                </div>
                <div className="w-full col-span-2">
                    <h4 className={"capitalize font-bold mt-12 text-xl mb-12"}>Sorry this page doesn't exist!</h4>

                    <p className={"mb-8 leading-relaxed"}>
                        We couldn’t find the page you are looking for
                        <br/>
                        But we have millions more shopping items for you to browse!
                    </p>

                    <LinkButton bg={"#D13D19"} color={"#fff"} text={"GO TO HOMEPAGE"} location={"/home"}
                                className={"font-light"}/>
                </div>
            </div>
        </>
    );
}
