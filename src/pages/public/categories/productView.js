import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { HorizontalTrackComponent } from "../../../components/track";
import React, { useEffect, useState } from "react";
import { overrideSetProduct } from "../../../store/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { image404, productImage } from "../../../assets";
import { Carousel } from "react-responsive-carousel";
import ReactStars from "react-rating-stars-component";
import { formatPrice } from "../../../utils/helpers";
import { Button, ButtonGroup, LinkButton } from "../../../components/buttons";
import { addToCart, decrementCartItem, incrementCartItem } from "../../../store/reducers/cartReducer";
import { addToBookmarksServer, registerView, removeFromBookmarksServer } from "../../../store/actions/publicActions";
import { updateLocation } from "../../../store/reducers/adminReducer";
import { RecentlyViewed } from "../../../components/cards/sliders";
import { fetchProduct } from "../../../store/actions/productActions";
import { HeartIcon } from "@heroicons/react/24/solid";
import { updateBookmarks } from "../../../store/reducers/authReducer";
import { toast } from "react-toastify";
import { NotFound } from "../NotFound";

const ProductView = ({ path }) => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(state => state.products.product)
  const state = useSelector(state => state)
  const [nF, setNF] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const [description, setDescription] = useState({})

  useEffect(() => {
    dispatch(updateLocation("productView"))
  }, [])

  useEffect(() => {
    fetchProduct(slug)
      .then(
        result => {
          if (result.data.product) {
            console.log("result: ", result.data.product)
            dispatch(overrideSetProduct(result.data.product))
          }
          else
            setNF(true)
        },
        error => setNF(true)
      )
      .catch(() => setNF(true))
  }, [slug])

  useEffect(() => {
    registerView(product.slug)
    let rv = JSON.parse(localStorage.getItem("rV") || "[]")

    if (rv.findIndex(i => i.slug === product.slug) < 0) {
      rv.push(product)
      localStorage.setItem("rV", JSON.stringify(rv))
    }
  }, [state.products.product])

  useEffect(() => setDescription(JSON.parse(product.description || "{}")), [product])

  const handleIncrement = () => {
    dispatch(incrementCartItem(product.product_id))
  };

  const handleDecrement = () => {
    dispatch(decrementCartItem(product.product_id))
  };

  const aTC = () => {
    dispatch(addToCart({
      product: product,
      amount: 1
    }))
  }

  const toggleFavorites = () => {
    if (state.auth.auth.authenticated) {
      if (state.auth.bookmarked_items.findIndex(item => item.slug === slug) === -1)
        addToBookmarksServer(slug)
          .then(
            result => {
              toast.success(`Added ${product.name} to favorites!`)
              dispatch(updateBookmarks(result.data.data))
            }
          )
      else
        removeFromBookmarksServer(slug)
          .then(
            result => {
              toast.success(`Removed ${product.name} from favorites!`)
              dispatch(updateBookmarks(result.data.data))
            }
          )

    } else {
      setRedirect(true)
    }
  }

  return (
    <>
      {
        nF ?
          <NotFound />
          :
          <>
            {
              redirect ?
                <Navigate to={"/login"} />
                :
                null
            }
            <HorizontalTrackComponent
              className="py-3 flex flex-row w-full items-center px-2 text-sm font-light">
              {
                path ?
                  <>
                    <Link to={"/home"} className="pr-1">Home</Link>
                    {
                      slug ?
                        <>
                          <ChevronRightIcon className={"w-4 h-4 mr-1"} />
                          <Link to={``} className="capitalize">{slug}</Link>
                        </> : null
                    }
                  </> : null
              }
            </HorizontalTrackComponent>

            <div className="py-2 px-2 bg-white rounded-lg divide-y lg:grid lg:grid-cols-5 gap-4">
              <div className="w-full py-2 col-span-2 relative">
                <div onClick={() => toggleFavorites()}
                  className={"mx-2 block lg:hidden absolute z-20 rounded-full bg-white right-0 bg-slate-600 border text-white transition duration-300 border-slate-400 p-2 border-white "
                    + (state.auth.bookmarked_items.findIndex(item => item.slug === slug) === -1 ? "" : "bg-[#d13D19]")
                  }>
                  <HeartIcon className={"w-6 h-6 transition duration-300 "} />
                </div>
                <Carousel
                  className={"w-full flex justify-center items-center rounded "}
                  autoPlay
                  showThumbs={false}
                  showArrows={true}
                  infiniteLoop={true}
                  showStatus={false}
                  centerMode={true}
                >
                  {
                    (product.url || []).map((url, key) =>
                      <img key={key} className="mx-auto" src={url.url} alt={productImage.alt} />
                    )
                  }
                </Carousel>
              </div>

              <div className="col-span-3">
                <div className="">
                  <div className="w-full flex flex-row items-center">
                    <h4 className={"py-2 text-[#D13D19] md:text-2xl"}>{product.name}</h4>
                    <div
                      className={"ml-auto mr-2 hidden lg:block transition duration-300  cursor-pointer rounded-full bg-slate-600 p-2 "
                        + (state.auth.bookmarked_items.findIndex(item => item.slug === slug) === -1 ? "" : "bg-[#d13D19]")
                      }
                      onClick={() => toggleFavorites()}>
                      <HeartIcon className={"text-white transition duration-300  w-6 h-6"} />
                    </div>
                  </div>
                  <h4 className={"pb-2 text-sm md:text-lg font-light"}>Brand: {product.brand}</h4>
                  <div className="py-1">
                    <ReactStars count={5} size={20} onChange={() => {
                    }} edit={false} activeColor="#ffd700" />
                  </div>
                </div>

                <div className="py-2">
                  <h4 className={"font-bold text-2xl md:text-3xl pb-1"}>
                    {
                      formatPrice(
                        (product.discount || [{}]).sort(i => i.discount_active === 1)[0].discount_active === 1 ?
                          (1 - (parseInt(product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * product.price
                          :
                          product.price
                      )
                    }
                  </h4>
                  <h4 className="">
                    {
                      (product.discount || [{}]).sort(i => i.discount_active)[0].discount_active === 1 ?
                        <div className={"flex flex-row text-xs md:text-lg items-center"}>
                          <div
                            className="line-through text-gray-500 mr-2">{formatPrice(product.price)}</div>

                          <div
                            className="bg-[#D13D19] text-white w-fit p-1">
                            {(product.discount || [{}]).sort(i => i.discount_active)[0].discount_percentage}
                            <span className="pr-1">% Off</span>
                          </div>
                        </div>
                        :
                        null
                    }
                  </h4>
                  <br />
                  {
                    state.cart.cart.findIndex(cartItem => cartItem.product.product_id === product.product_id) >= 0 ?
                      <div className={"w-full lg:w-1/2 md:py-4"}>
                        <ButtonGroup className={"w-full justify-around px-2 relative z-20"}>
                          <Button text={"-"} bg={"#473144"} size={"md"}
                            onClick={handleDecrement}
                            className={"w-fit py-2 "} />
                          <h4 className={"w-full flex justify-center items-center"}>
                            {state.cart.cart[state.cart.cart.findIndex(cartItem => cartItem.product.product_id === product.product_id)].amount}
                          </h4>
                          <Button text={"+"} bg={"#473144"} size={"md"}
                            onClick={handleIncrement}
                            className={"w-fit py-2"} />
                        </ButtonGroup>
                      </div>
                      :
                      <Button text={"Add to Cart"} bg={"#473144"} size={"lg"}
                        className={"py-2 rounded-none relative z-20 "}
                        onClick={aTC} />
                  }
                </div>

                <div className="">

                </div>
              </div>
            </div>

            <div className="py-4 px-2">
              <h4 className="py-2 font-light text-lg ">
                Frequently Bought Together
              </h4>

              <HorizontalTrackComponent className={"bg-white"}>

              </HorizontalTrackComponent>
            </div>


            <div className="py-2 px-2 bg-white rounded-lg mt-4 divide-y">
              <h4 className={"py-2 px-4 font-light text-lg"}>Product Description</h4>

              <div dangerouslySetInnerHTML={{ "__html": description.details }} className="py-2 px-4" />
            </div>

            <div className="py-4 px-2 bg-white rounded-lg mt-4 grid gap-2 grid-cols-1 md:grid-cols-2">
              <div className="px-4 border rounded-lg divide-y capitalize py-2">
                <h4 className={"px-2  lg:py-4 font-light"}>key features</h4>

                <div dangerouslySetInnerHTML={{ "__html": description.key_features }}
                  className="px-2 py-4 " />
              </div>
              <div className="px-4 border rounded-lg divide-y capitalize py-2">
                <h4 className={"px-2 lg:py-4  font-light"}>box details</h4>

                <div dangerouslySetInnerHTML={{ "__html": description.box_details }}
                  className="px-2 py-4 " />
              </div>
              <div className="px-4 border rounded-lg divide-y capitalize py-2">
                <h4 className={"px-2 lg:py-4  font-light"}>specifications</h4>

                <div dangerouslySetInnerHTML={{ "__html": description.specifications }}
                  className="px-2 py-4 " />
              </div>
            </div>
          </>
      }
      {/* <RecentlyViewed /> */}

      {/*<div className="py-4 px-2 md:px-2">*/}
      {/*    <h4 className="py-2 font-light text-lg ">*/}
      {/*        Customers Also Bought*/}
      {/*    </h4>*/}

      {/*    <HorizontalTrackComponent className={"bg-white"}>*/}

      {/*    </HorizontalTrackComponent>*/}
      {/*</div>*/}
    </>
  )
}

export default ProductView