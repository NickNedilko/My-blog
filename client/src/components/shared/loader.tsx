import { RingLoader } from "react-spinners";




export const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <RingLoader
            color="blue"
            />
        </div>
    )
}