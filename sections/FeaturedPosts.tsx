import React, { useState, useEffect } from "react";

import { FeaturedPostCard } from "../components";
import Post from "../model/Post";
import { getFeaturedPosts } from "../services";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import { ShimmerFeaturedPosts } from "../components/Shimmers";

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const result: Post[] = await getFeaturedPosts();

      setFeaturedPosts(result);
      setDataLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="mb-8">
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
      >
        {dataLoaded &&
          featuredPosts.map((post, index) => (
            <SwiperSlide
              key={`${index}_${post.slug}`}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              {loading ? (
                <ShimmerFeaturedPosts key={index} />
              ) : (
                <FeaturedPostCard key={index} post={post} />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default FeaturedPosts;
