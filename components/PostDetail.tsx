import moment from "moment";
import Image from "next/image";
import React from "react";
import Post from "../model/Post";

interface IProps {
  post: Post;
}

function PostDetail({ post }: IProps) {
  const getContentFragment = (
    index: number,
    text: any,
    obj: any,
    type?: string
  ) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
      if (obj.href) {
        modifiedText = (
          <a
            className="underline text-xl"
            key={index}
            target={obj.openInNewTab && "_blank"}
            href={obj.href}
          >
            {obj.children[0].text || obj.children[0].title}
          </a>
        );
      }
    }

    switch (type) {
      case "code-block":
        return (
          <div
            key={index}
            className="bg-gray-100 p-4 w-full rounded-md whitespace-pre select-all my-4 overflow-x-auto hide-scrollbar"
          >
            <p className="text-gray-800 antialiased font-light text-lg font-serif">
              {modifiedText.map((item: any, i: number) => (
                <React.Fragment key={i}>{item}</React.Fragment>
              ))}
            </p>
          </div>
        );
      case "heading-two":
        return (
          <h2 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p
            key={index}
            className="mb-8 mt-2 text-gray-800 antialiased font-light text-lg font-serif"
          >
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );

      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <div className="relative h-[350px] w-full">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            fill
            className="object-center absolute  object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-2">
          <div className="flex items-center my-8 w-full">
            <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
              <div className="w-[40px] h-[40px] relative">
                <Image
                  src={post.author.photo.url}
                  fill
                  alt={post.author.name}
                  className="object-cover absolute  rounded-full"
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
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

          {post.content?.raw.children.map((typeObj: any, index: number) => {
            const children = typeObj.children.map(
              (item: any, itemindex: number) =>
                getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
