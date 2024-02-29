import React from "react";
import Image from "next/image";
import { MinusCircleIcon } from "lucide-react";

interface BookImageProps {
  url: string;
  title: string;
  onRemove: () => void; // Add this line
}

const BookImage: React.FC<BookImageProps> = ({ url, title, onRemove }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-[81px] h-[100px] sm:w-[102px] sm:h-[120px]  lg:w-[115px] lg:h-[160px] bg-[#FF6600] rounded-xl">
        <Image
          src={url}
          fill
          alt="Read This Next"
          sizes="(max-width:   640px)   30vw, (max-width:   768px)   40vw,   115px"
          className="object-fit rounded-xl"
        />
        <button onClick={onRemove} className="absolute top-0 right-0">
          <MinusCircleIcon className="text-white bg-red-500 rounded-full" />
        </button>
      </div>
      <p className="text-sm text-center font-thin text-gray-600 my-2 p-1 w-[160px] line-clamp-2">{title}</p>
    </div>
  );
};

export default BookImage;
