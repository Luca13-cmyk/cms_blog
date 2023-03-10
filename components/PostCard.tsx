import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Post from "../model/Post";
import useSearchStore from "../store/searchStore";

interface IProps {
  post: Post;
}

function PostCard({ post }: IProps) {
  const { toggleSearch, removeSearch } = useSearchStore();
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          fill
          className="object-center absolute  object-cover shadow-lg md:rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link
          onClick={() => {
            removeSearch();
            toggleSearch(false);
          }}
          href={`/post/${post.slug}`}
        >
          {post.title}
        </Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full ">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <div className="w-[40px] h-[40px] relative">
            <Image
              src={post.author.photo.url}
              fill
              alt={post.author.name}
              className="object-cover absolute  rounded-full"
              // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
              // placeholder="blur"
            />
          </div>
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8 overflow-x-hidden">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link
          onClick={() => {
            removeSearch();
            toggleSearch(false);
          }}
          href={`/post/${post.slug}`}
        >
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
