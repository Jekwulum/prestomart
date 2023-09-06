export const HorizontalTrackComponent = ({className= "",  children}) => {

    return(
        <div
             className={"flex flex-row w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 w-full py-4 " + className}>
            {children}
        </div>
    )
}