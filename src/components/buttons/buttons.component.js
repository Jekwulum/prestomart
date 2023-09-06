import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export const Button = ({
                           bg = "rgba(0,0,0,0)",
                           color = "#ffffff",
                           text = "",
                           size = "lg",
                           className,
                           onClick
                       }) => {
    const style = {
        color: color,
        backgroundColor: bg
    }

    return (
        <button
            style={style} onClick={onClick}
            className={` outline-none max-w-7xl rounded ${className} ` + (size === "lg" ? "w-full px-4 py-4" : size === "md" ? "py-2 px-4" : size === "sm" ? "py-1 px-2 text-sm" : "py-1 px-1 text-xs")
            }
        >
            {text}
        </button>
    )
}

Button.propTypes = {
    size: PropTypes.oneOf(['sm', 'lg', 'md', 'xs'],),
    bg: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export const LinkButton = ({
                               bg = "rgba(0,0,0,0)",
                               color = "#ffffff",
                               text = "",
                               size = "lg",
                               className,
                               location,
                               style,
                               children
                           }) => {
    const _style = {
        color: color,
        backgroundColor: bg,
        ...style
    }

    return (
        <Link
            to={location}
            style={_style}
            className={`block text-center flex justify-center overflow-hidden break-normal truncate outline-none max-w-7xl rounded ${className} ` + (size === "lg" ? "w-full px-4 py-4" : size === "md" ? "py-2 px-4" : size === "sm" ? "py-1 px-2 text-sm" : "py-1 px-1 text-xs")
            }
        >
            {text ? text : children}
        </Link>
    )
}

LinkButton.propTypes = {
    size: PropTypes.oneOf(['sm', 'lg', 'md', 'xs'],),
    bg: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    location: PropTypes.string.isRequired
}


export const TransparentButton = ({children, className}) => {

    return (
        <button className={"mt-2 flex flex-row items-center justify-center w-fit px-4 " + className}>
            {children}
        </button>
    )
}

export const ButtonGroup = ({borderRadius = "4px", className, children}) => {
    const ref = useRef(null)
    useEffect(() => {
        ref.current.childNodes.forEach(node => {
            node.style.borderRadius = 0;
        })

        ref.current.children[0].style.borderBottomLeftRadius = borderRadius;
        ref.current.children[0].style.borderTopLeftRadius = borderRadius;
        ref.current.children[ref.current.children.length - 1].style.borderBottomRightRadius = borderRadius;
        ;
        ref.current.children[ref.current.children.length - 1].style.borderTopRightRadius = borderRadius;
        ;
    }, [])

    return (
        <div ref={ref} className={"flex flex-row " + className}>
            {children}
        </div>
    )
}

export const PaginationButton = ({icon, onClick}) => {
    return (
        <button className={"bg-slate-300 p-2 mx-1"} onClick={onClick} style={{minWidth: "40px"}}>
            {icon}
        </button>
    )
}