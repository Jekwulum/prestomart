import React from "react";
import {ChevronRightIcon,} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {paymentChannels} from "../../assets";
// import socials from "../../assets/header_social_media_links.svg";

export const CustomerSiteFooterComponent = () => {
    return (
        <footer className="footer w-full  max-w-screen bg-gray-200 pt-20 pb-24">
            <div className="container mx-auto max-w-7xl  flex flex-col md:grid grid-cols-4 gap-2 md:px-4">
                <div className="px-4 mb-8 md:mb-0">
                    <h4 className="font-bold text-center md:text-left">
                        Customer Service
                    </h4>

                    <ul className="flex flex-col font-light mt-8 justify-center">
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Your Account</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Your Orders</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Shipping Rates & Policies</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Return & Refund</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Help Center</p>
                        </Link>
                    </ul>
                </div>

                <div className="px-4 mb-8 md:mb-0">
                    <h4 className="font-bold text-center md:text-left">
                        About Us
                    </h4>

                    <ul className="flex flex-col font-light mt-8 justify-center">
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>About Presto Mart</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>How to Buy</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>How to Sell</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Careers</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Blog</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Contact Us</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Privacy Policy</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>FAQ</p>
                        </Link>
                    </ul>
                </div>

                <div className="px-4 mb-8 md:mb-0">
                    <h4 className="font-bold text-center md:text-left">
                        Partner With Us
                    </h4>

                    <ul className="flex flex-col font-light mt-8 justify-center">
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Corporate Purchases</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Make Money With Us</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Referrals</p>
                        </Link>
                        <Link to="/" className="flex justify-left items-center mb-2">
                            <ChevronRightIcon className={"w-5 h-5"}/>
                            <p>Logistics</p>
                        </Link>
                    </ul>
                </div>

                <div className="px-4 mb-8 md:mb-0">
                    <div className="mb-8">
                        <h4 className="font-bold text-center md:text-left">
                            Follow Us
                        </h4>

                        <ul className="flex flex-col font-light mt-8 justify-center">
                            <Link to="/" className="flex justify-left items-center mb-2">
                                <ChevronRightIcon className={"w-5 h-5"}/>
                                <p>Corporate Purchases</p>
                            </Link>
                            <Link to="/" className="flex justify-left items-center mb-2">
                                <ChevronRightIcon className={"w-5 h-5"}/>
                                <p>Make Money With Us</p>
                            </Link>
                            <Link to="/" className="flex justify-left items-center mb-2">
                                <ChevronRightIcon className={"w-5 h-5"}/>
                                <p>Referrals</p>
                            </Link>
                            <Link to="/" className="flex justify-left items-center mb-2">
                                <ChevronRightIcon className={"w-5 h-5"}/>
                                <p>Logistics</p>
                            </Link>
                        </ul>
                    </div>

                    <div className="">
                        <h4 className="font-bold text-center md:text-left">
                            Payment
                        </h4>

                        <div className="">
                            <img
                                alt={paymentChannels.alt}
                                className={"mt-8 mx-auto"}
                                src={paymentChannels.img}
                            ></img>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
