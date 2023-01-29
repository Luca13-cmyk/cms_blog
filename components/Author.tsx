import Image from "next/image";
import IAuthor from "../model/Author";

interface IProps {
  author: IAuthor;
}

function Author({ author }: IProps) {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative  rounded-lg bg-black bg-opacity-20">
      <div className="absolute  left-4 -top-14">
        <div className="relative w-[80px] h-[80px]">
          <Image
            alt={author.name}
            fill
            className="object-cover absolute rounded-full"
            src={author.photo.url}
          />
        </div>
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
}

export default Author;
