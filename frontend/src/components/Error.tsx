import { RiErrorWarningFill } from "react-icons/ri";

export default function Error({ message = "Please try again later" }: { message?: string }){
    return (
        <div className="flex flex-col justify-center items-center gap-y-4">
            <div className="flex items-center w-full justify-center">
                <div className="flex-1 border-t-2 border-secondary mr-2"></div>
                    <RiErrorWarningFill className="text-primary text-[5rem]" />
                    <div className="flex-1 border-t-2 border-secondary ml-2"></div>
                </div>
            <div className="flex flex-col gap-y-4 items-center w-full">
                <p className="text-darkgray text-3xl text-center">{message}</p>
                <p className="text-darkgray text-lg text-center">
                    Sorry for the inconvenience. <br /> Please refresh or try again later
                </p>
            </div>
      </div>
    )
}
