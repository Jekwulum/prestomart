import React from "react";

export const PlainTextInput = ({
                                   type = "text",
                                   placeholder = "",
                                   className = "",
                                   icon,
                                   autoComplete,
                                   name,
                                   onFocus,
    onBlur,
                                   containerClasses,
                                   onChange,
                               }) => {
    return (
        <div className={"relative max-w-7xl z-0 flex justify-center items-center " + containerClasses}>
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2">{icon}</span>
            <input
                name={name}
                autoComplete={autoComplete}
                onBlur={onBlur}
                onFocus={onFocus}
                className={"w-full outline-none max-w-7xl px-4 py-2 rounded border border-slate-300 " + className}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export const ColoredTextInput = ({
                                     type = "text",
                                     placeholder = "",
                                     value,
                                     label = "",
                                     color = "#000",
                                     onChange,
                                     disabled = false,
                                     props
                                 }) => {

    return (
        <label className={`relative text-[${color}]`}>
            <span
                className={"capitalize  bg-white absolute transform -translate-y-1/2 px-1 left-2 text-xs lg:text-sm"}>{label}</span>
            <input
                className={`w-full outline-none px-4 py-3 rounded border border-[${color}]`}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
        </label>
    )
}

export const ColoredTextArea = ({
                                    type = "text",
                                    placeholder = "",
                                    label = "",
                                    color = "#D13D19",
                                    onChange
                                }) => {

    return (
        <label className={`relative text-[${color}]`}>
            <span
                className={"capitalize  bg-white absolute transform -translate-y-1/2 px-1 left-2 text-xs lg:text-sm"}>{label}</span>
            <textarea
                onChange={onChange}
                className={`w-full outline-none px-4 py-3 rounded border border-[${color}]`}
                placeholder={placeholder}
            />
        </label>
    )
}

export const ColoredSelect = ({
                                  placeholder = "",
                                  label = "",
                                  color = "#D13D19",
                                  onChange,
                                  children
                              }) => {

    return (
        <label className={`relative text-[${color}]`}>
            <span
                className={"capitalize  bg-white absolute transform -translate-y-1/2 px-1 left-2 text-xs lg:text-sm"}>{label}</span>
            <select
                onChange={onChange}
                className={`w-full outline-none px-4 py-4 rounded bg-white border border-[${color}]`}
                placeholder={placeholder}
            >
                {children}
            </select>
        </label>
    )
}

export const FileUploader = ({onFileSelect, label, name}) => {
    return (
        <div className="relative">
            <span
                className={"capitalize  bg-white absolute transform -translate-y-1/2 px-1 left-2 text-xs lg:text-sm"}>{label}</span>
            <input type="file" onChange={onFileSelect}
                   className={"w-full outline-none px-4 py-3 rounded border border-[${color}]"}/>
        </div>
    )
}