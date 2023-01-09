import moment from "moment";
import { useEffect, useState } from "react";
import Post from "../model/Post";

import Image from "next/image";

import { getRecentPosts, getSimilarPosts } from "../services";
import Link from "next/link";

interface IProps {
  categories?: string[];
  slug?: string;
}

function PostWidget({ categories, slug }: IProps) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug && categories) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post: Post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <div className="relative w-[60px] h-[60px]">
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                fill
                className="absolute rounded-full"
              />
            </div>
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostWidget;
