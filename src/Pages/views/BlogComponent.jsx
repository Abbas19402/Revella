import React from "react";
import { blogData } from "../../Assets/Apis/blogdata";

const BlogComponent = ()=> {
  return (
    <div>
      <div id="blog" className="overflow-hidden px-8 md:px-16 lg:px-32 my-14">
        <div id="head" className="mt-14 mb-10">
          <div
            id="topHeading"
            className={`text-center flex flex-row items-center justify-center mt-3`}
          >
            <div className="mx-0.5 lg:mx-2">
              <span className="text-2xl font-firaCode font-bold">-----</span>
            </div>
            <div className="mx-3">
              <span className="text-xl lg:text-3xl font-semibold">Latest from Blog</span>
            </div>
            <div className="mx-0.5 lg:mx-2">
              <span className="text-2xl font-firaCode font-bold">-----</span>
            </div>
          </div>
          <div id="subHeading" className="text-center">
            <span className="font-serif italic font-medium text-gray-400">
              The freshest and most exciting news
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-6 md:px-0">
          {blogData.map((value, key) => (
            <>
              <div key={key} id="card" className="flex flex-col">
                <div id="image" className="my-1">
                  <img src={value.image} alt="" />
                </div>
                <div id="titlexLink" className="my-1">
                  <a href={value.blogAddress}>
                    <span className="font-semibold text-lg hover:text-sky-500 transition duaration-1000">
                      {value.title}
                    </span>
                  </a>
                </div>
                <div id="byxdate" className="my-1 flex flex-row">
                  <span className="text-gray-500 mx-1">{value.by}</span>
                  <span className="text-gray-500">{value.date}</span>
                </div>
                <div id="description" className="my-1">
                  <span className="text-md text-gray-400 ">
                    {value.description}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
