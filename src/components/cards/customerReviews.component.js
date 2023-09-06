import React from "react";
import ReactStars from "react-rating-stars-component";
import ProgressBar from "@ramonak/react-progress-bar";
import {ChevronDownIcon, FunnelIcon} from "@heroicons/react/24/outline";
import {TransparentButton} from "../buttons";

export const CustomerReviewsComponent = () => {

    return (
        <div className={"rounded border border-slate-400 h-full py-3 px-6 h-full "}>
            <h4 className="font-bold text-normal mb-2">Customers Reviews</h4>

            <div className="mb-8">
                <div className="flex flex-row  items-center">
                    <div className="mr-4">
                        <ReactStars
                            count={5}
                            size={45}
                            activeColor="#ffd700"
                        />
                    </div>
                    <span className={"font-bold"}>
                    0 out of 5 stars
                </span>
                </div>
                <p className={"text-sm font-light"}>
                    Overall rating from last 100 customers
                </p>
                <div className="">
                    <TransparentButton>
                        <FunnelIcon className={"w-6 h-6 mr-1"}/>
                        <span className={"ml-1"}>View Filters</span>
                        <ChevronDownIcon className={"w-5 h-5"}/>
                    </TransparentButton>
                </div>
            </div>

            <table className="table-auto w-full mb-8">
                <tbody className={"w-full"}>
                <tr className={"w-full "}>
                    <td className={"pb-8 mr-4"}>Excellent</td>
                    <td className={"w-full px-2 pb-8"}>
                        <ProgressBar
                            height={"15px"}
                            completed={55}
                            customLabel={" "}
                            bgColor={"#18C06C"}
                        />
                    </td>
                </tr>
                <tr className={"w-full "}>
                    <td className={"pb-8 mr-4"}>Good</td>
                    <td className={"w-full px-2 pb-8"}>
                        <ProgressBar
                            height={"15px"}
                            completed={30}
                            customLabel={" "}
                            bgColor={"#42D98D"}
                        />
                    </td>
                </tr>
                <tr className={"w-full "}>
                    <td className={"pb-8 mr-4"}>Average</td>
                    <td className={"w-full px-2 pb-8"}>
                        <ProgressBar
                            height={"15px"}
                            completed={10}
                            customLabel={" "}
                            bgColor={"#FFC630"}
                        />
                    </td>
                </tr>
                <tr className={"w-full "}>
                    <td className={"pb-8 mr-4"}>Bad</td>
                    <td className={"w-full px-2 pb-8"}>
                        <ProgressBar
                            height={"15px"}
                            completed={3}
                            customLabel={" "}
                            bgColor={"#E6A53B"}
                        />
                    </td>
                </tr>
                <tr className={"w-full "}>
                    <td className={"pb-8 mr-4"}>Poor</td>
                    <td className={"w-full px-2 pb-8"}>
                        <ProgressBar
                            height={"15px"}
                            completed={2}
                            customLabel={" "}
                            bgColor={"#F03434"}
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <p className={"text-center mt-4 mb-6"}>
                Overall Performance is looking good!
            </p>

            <div className="w-full mb-6">
                <button className={"mx-auto block rounded bg-blue-300 px-4 py-2 text-blue-900"}>
                    See All Customer Reviews
                </button>
            </div>
        </div>
    )
}