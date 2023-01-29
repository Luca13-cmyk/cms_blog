import React, { useState } from "react";
import { useRouter } from "next/router";

import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, Loader, Pagination } from "../../components";
import Post from "../../model/Post";

interface IProps {
  posts: { node: Post }[];
}

const CategoryPost = ({ posts }: IProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto sm:px-1 md:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {currentPosts.map((data: { node: Post }, index: number) => (
            <PostCard key={index} post={data.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            {posts.length > postsPerPage && (
              <Pagination
                posts={posts}
                currentPage={currentPage}
                paginate={paginate}
                postsPerPage={postsPerPage}
              />
            )}
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const posts = await getCategoryPost(slug);

  return {
    props: { posts },
    revalidate: 60,
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }: { slug: string }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}
