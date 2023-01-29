import moment from "moment";
import { useEffect, useState } from "react";
import Post from "../model/Post";

import Image from "next/image";

import { getRecentPosts, getSimilarPosts } from "../services";
import Link from "next/link";
import { ShimmerPostWidget } from "./Shimmers";

interface IProps {
  categories?: string[];
  slug?: string;
}

function PostWidget({ categories, slug }: IProps) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      if (slug && categories) {
        const result = await getSimilarPosts(categories, slug);
        setRelatedPosts(result);
      } else {
        const result = await getRecentPosts();
        setRelatedPosts(result);
      }
    } catch (error) {
      alert("Somenthing went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {loading ? (
        <ShimmerPostWidget />
      ) : (
        <>
          {relatedPosts.map((post: Post) => (
            <Link href={`/post/${post.slug}`} key={post.title}>
              <div className="hover:bg-gray-50 flex items-center w-full mb-4">
                <div className="w-16 flex-none">
                  <div className="relative w-[60px] h-[60px]">
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      className="object-cover absolute rounded-full"
                    />
                  </div>
                </div>
                <div className="flex-grow ml-4">
                  <p className="text-gray-500 font-xs">
                    {moment(post.createdAt).format("MMM DD, YYYY")}
                  </p>
                  <p className="text-md">{post.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default PostWidget;
