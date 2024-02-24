import Image from "next/image"

const Suggestion = () => {
  return (
    <div className="flex flex-col gap-y-2  w-[80%] mx-auto ">
    <div className="flex space-x-4">
        <Image src="/next.svg" width={400} height={400} alt="Book Image" className="border border-gray-400 p-4 rounded-lg" />
        <div>
            <h3>Book Title</h3>
            <p>Author</p>
        </div>
    </div>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam nostrum expedita enim illum impedit dolores tempore dolor, commodi facilis magnam consectetur laboriosam hic deleniti libero placeat alias quibusdam? Optio, eius.
    Labore voluptas aut tempora repellendus odit veritatis sit voluptatibus aliquid dolore consectetur. Rem vitae debitis odio voluptates, culpa aut incidunt reiciendis facilis dolore nisi delectus quo excepturi quas quos exercitationem.
    Assumenda eligendi unde, maiores porro voluptate suscipit reiciendis repudiandae neque hic earum deleniti, nobis, optio delectus ullam culpa ipsam repellat officiis in laborum? Dolore aliquam adipisci consectetur accusamus! Eum, pariatur.</p>
    </div>
  )
}

export default Suggestion