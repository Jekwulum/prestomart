import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {SavedItemComponent} from "../../components/cards/savedItemComponent";
import {emptyCartItem} from "../../assets";

const Saved = () => {
    const state = useSelector(state => state)

    useEffect(() => {

    }, [])

    return (
        <div className={"divide-y "}>
            <h4 className={"text-xl pb-2"}>Saved Items ({state.auth.bookmarked_items.length})</h4>

            {
                state.auth.bookmarked_items.length === 0 ?
                    <div>
                        <img src={emptyCartItem.img} alt={emptyCartItem.alt} className={"mx-auto w-36 py-12"}/>

                        <h4 className={"text-center px-4"}>Looks like there is nothing here, look around and add some
                            items!</h4>
                    </div>
                    :
                    <>
                        <div className="py-4">
                            {
                                state.auth.bookmarked_items.map((item, key) =>
                                    <SavedItemComponent key={key} product={item}/>
                                )
                            }
                        </div>
                    </>
            }
        </div>
    )
}

export default Saved