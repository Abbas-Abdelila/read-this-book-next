import { BookSuggestion } from "@/types/types";
import Image from "next/image";

const Suggestion = ({ data } : { data: BookSuggestion }) => {
  console.log("At Suggestion: ",  data)
  return (
    <div className="flex flex-col gap-y-2  w-[80%] mx-auto lg:max-w-2xl">
      <h3 className="text-2xl font-semibold text-gray-700 text-center">
        Book Suggestion ✨
      </h3>
      <div className="flex space-x-4 items-start p-6 bg-[#f3f3ee] rounded-md">
        <div className="relative w-[81px] h-[100px] sm:w-[102px] sm:h-[120px]  lg:w-[115px] lg:h-[160px] flex-shrink-0 bg-[#FF6600] rounded-xl">
          <Image
            src={data.image ?? "/book_placeholder.jpg"}
            fill
            alt="Read This Next"
            sizes="(max-width:   640px)   30vw, (max-width:   768px)   40vw,   115px"
            className="object-fit rounded-xl"
          />
        </div>

        <div>
          <h3 className=" text-xl font-semibold text-slate-800" >{data.title}</h3>
          <p className="text-slate-700 my-2" >{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
