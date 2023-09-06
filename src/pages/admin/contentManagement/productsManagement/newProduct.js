import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { HorizontalTrackComponent } from "../../../../components/track";
import { ProductDetailsForm, ProductImagesForm, ProductOverviewForm } from "./forms";
import { Button, ButtonGroup, LinkButton } from "../../../../components/buttons";
import { ProductInventoryForm } from "./forms/productInventory";
import { createNewProductServer, fetchProducts } from "../../../../store/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { emptyProduct, updateProducts } from "../../../../store/reducers/productReducer";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const NewProduct = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.products)
  const [redirect, setRedirect] = useState(false)

  const createNewProduct = (cb) => {
    if (Object.keys(state.product).length === 0) {
      toast.error("Please fill the form completely... ")
      return;
    }
    if (state.product.name === undefined || state.product.name.length < 5) {
      toast.error("Please fill name appropriately (Minimum of 5 characters)")
      return;
    }
    if ((state.product.image1 === undefined) && (state.product.image2 === undefined)) {
      toast.error("Please upload an image for image1 and image 2...")
      return;
    }

    const data = state.product;
    const productImages = {};
    if (data.image1) productImages["image1"] = { "url": data.image1 };
    if (data.image2) productImages["image2"] = { "url": data.image2 };
    if (data.image3) productImages["image3"] = { "url": data.image3 };
    if (data.image4) productImages["image4"] = { "url": data.image4 };
    const payload = {
      product: {
        name: data.name,
        sku: data.sku,
        price: data.price,
        brand: data.brand,
        product_subcategory_id: data.product_subcategory_id,
        description: {
          details: (data["description"] && data["description"].details) ? data["description"].details : "",
          key_features:(data["description"] && data["description"].key_features) ? data["description"].key_features : "",
          box_details: (data["description"] && data["description"].box_details) ? data['description'].box_details : "",
          specifications: (data["description"] && data["description"].specifications) ? data['description'].specifications : ""
        }
      },
      inventory: {
        store_quantity: data.store_quantity || "",
        warehouse_quantity: data.warehouse_quantity || "",
        store_warning_quantity: data.store_warning_quantity || 0,
        warehouse_warning_quantity: data.warehouse_warning_quantity || 0
      },
      productImages
    };
    console.log("payload: ", payload);
    console.log("data: ", data)

    toast.promise(createNewProductServer(payload), {
      pending: "Creating new product...",
      success: "New product successfully created!"
    }).then((res) => {
      fetchProducts(state.page, state.limit)
        .then(
          result => {
            dispatch(updateProducts(result.data))
            dispatch(emptyProduct())

            if (cb === 1) {
              setRedirect(true)
            }
          }
        )
    })
  }

  return (
    <div
      className={"h-screen w-full bg-slate-300 fixed bg-opacity-50 z-50 transform -translate-x-3 -translate-y-20 flex justify-center items-center"}>
      <div className="w-fit">
        {
          redirect
          && <Navigate to={"/admin/content"} />
        }
        <Tabs className={"max-w-2xl transform -translate-y-20"}
          style={{ minWidth: "656px", height: "678px", maxHeight: "678px" }}>
          <TabList>
            <HorizontalTrackComponent className={"py-0 "}>
              <Tab
                className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl"}
                selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Overview</Tab>
              <Tab
                className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl"}
                selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Inventory</Tab>
              <Tab
                className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl"}
                selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Images</Tab>
              <Tab
                className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl mr-auto"}
                selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Details</Tab>
            </HorizontalTrackComponent>
          </TabList>

          <TabPanel
            className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
            style={{ maxHeight: "615px" }}>
            <ProductOverviewForm />
          </TabPanel>
          <TabPanel
            className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
            style={{ maxHeight: "615px" }}>
            <ProductInventoryForm />
          </TabPanel>
          <TabPanel
            className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
            style={{ maxHeight: "615px" }}>
            <ProductImagesForm />
          </TabPanel>
          <TabPanel
            className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
            style={{ maxHeight: "615px" }}>
            <ProductDetailsForm />
          </TabPanel>

          <div className="w-full px-4 pb-2 bg-white">
            <ButtonGroup className={"justify-end"}>
              <LinkButton location={"/admin/content/products"} size={"sm"} text={"Close"} bg={"red"}
                color={"white"} />
              <Button size={"sm"} text={"Save & Add Another"} bg={"blue"} color={"white"}
                onClick={() => createNewProduct(2)} />
              <Button size={"sm"} text={"Save"} bg={"blue"} color={"white"}
                onClick={() => createNewProduct(1)} />
            </ButtonGroup>
          </div>
        </Tabs>
      </div>
    </div>
  )
}