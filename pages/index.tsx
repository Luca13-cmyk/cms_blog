import { useState } from "react";
import { PostCard, PostWidget, Pagination, Categories } from "../components";
import Post from "../model/Post";
import FeaturedPosts from "../sections/FeaturedPosts";
import { getPosts } from "../services";

interface IProps {
  posts: { node: Post }[];
}

const Home = ({ posts }: IProps) => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto sm:px-1 md:px-10 mb-8">
      <div className="hidden md:block">
        <FeaturedPosts />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-12">
        <div className="lg:col-span-8 col-span-1">
          {currentPosts.map(
            // currentPosts
            (data: { node: Post }, index: number) => (
              <PostCard post={data.node} key={`${data.node.title}_${index}`} />
            )
          )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            {posts.length > postsPerPage && (
              <Pagination
                posts={posts} // posts
                currentPage={currentPage}
                paginate={paginate}
                postsPerPage={postsPerPage}
              />
            )}
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts: { node: Post }[] = (await getPosts()) || [];

  const shuffledPosts = posts.sort((a, b) => 0.5 - Math.random());

  return {
    props: { posts: shuffledPosts },
    revalidate: 60,
  };
};

export default Home;
