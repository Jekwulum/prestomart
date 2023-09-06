import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {toggleMobileMenu} from "../store/reducers/authReducer";

export default function ScrollToTop() {
    const {pathname} = useLocation();
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(() => {
        if (state.auth.publicSettings.mobileMenu)
            dispatch(toggleMobileMenu(state.auth.publicSettings.mobileMenu))

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return null;
}