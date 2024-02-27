import { BookSuggestion } from "@/types/types"
import Image from "next/image"

const Suggestion = ({ data } : { data : BookSuggestion}) => {
  return (
    <div className="flex flex-col gap-y-2  w-[80%] mx-auto ">
    <div className="flex space-x-4">
        <Image src="/next.svg" width={400} height={400} alt="Book Image" className="border border-gray-400 p-4 rounded-lg" />
        <div>
            <h3>{data.title}</h3>
            <p>{data.title}</p>
        </div>
    </div>
    <p>{data.description}</p>
    </div>
  )
}

export default Suggestion