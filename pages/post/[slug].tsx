import { useRouter } from "next/router";
import React from "react";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  Loader,
  PostDetail,
  PostWidget,
} from "../../components";
import Post from "../../model/Post";
import { getPostDetails, getPosts } from "../../services";

function PostDetails({ post }: { post: Post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto sm:px-1 md:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const data = await getPostDetails(slug);

  return {
    props: { post: data },
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }: { node: { slug: string } }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

export default PostDetails;
