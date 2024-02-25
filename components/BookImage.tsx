import Image from "next/image";

const BookImage = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-[115px] h-[160px]">
        <Image
          src={url}
          fill
          alt="Read This Next"
          className="object-fit rounded-xl"
        />
      </div>
      <p className="text-sm font-thin text-gray-600 my-2 p-1">{title}</p>
    </div>
  );
};

export default BookImage;
