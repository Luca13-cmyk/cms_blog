import React, { useEffect, useState } from "react";
import { getPosts } from "../services";
import useSearchStore from "../store/searchStore";
import { Blocks } from "react-loader-spinner";
import Post from "../model/Post";
import PostCard from "./PostCard";
import { Close } from "../assets";

const Search = () => {
  const { addSearch, toggleSearch, search } = useSearchStore();
  const [posts, setPosts] = useState<{ node: Post }[]>([]);
  const [postsFiltered, setPostsFiltered] = useState<{ node: Post }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (search) {
      const postsFiltered = posts.filter(
        (data: { node: Post }) =>
          data.node.title.toLowerCase().includes(search.toLowerCase()) ||
          data.node.author.name.toLowerCase().includes(search.toLowerCase())
      );

      setPostsFiltered(postsFiltered);
    }
  }, [search]);

  return (
    <div className="fixed inset-0 bg-black/80 z-20 overflow-y-auto">
      <nav className="flex justify-center items-start p-5 fixed top-0 z-30 bg-black/40 w-full">
        <div className="flex flex-row justify-around w-full">
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              addSearch(e.target.value)
            }
            placeholder="Search..."
            className="outline-none bg-gray-100 py-2 px-2 lg:w-[400px] rounded-md text-gray-500"
          />
          <button
            className="text-xl text-white font-semibold font-serif"
            onClick={() => toggleSearch(false)}
          >
            <Close />
          </button>
        </div>
      </nav>
      <main className="container mx-auto flex flex-col items-center justify-start">
        {loading ? (
          <div className="mt-24">
            <Blocks
              visible={true}
              height="120"
              width="120"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12">
            {search ? (
              <>
                {postsFiltered.map((data: { node: Post }, index: number) => (
                  <PostCard
                    post={data.node}
                    key={`${data.node.title}_${index}`}
                  />
                ))}
              </>
            ) : (
              <>
                {posts.map((data: { node: Post }, index: number) => (
                  <PostCard
                    post={data.node}
                    key={`${data.node.title}_${index}`}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
