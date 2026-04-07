import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { getAllPosts } from "@/lib/wordpress";

export function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        if (data) {
          setPosts(data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  return (
    <section id="blog" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn>
            <div>
              <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
                INSIGHTS
              </span>
              <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                思考と実践の記録
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <Link href="/blog">
              <a className="group inline-flex items-center gap-2 text-[#2C3E30] font-bold hover:text-[#D4AF37] transition-colors">
                <span className="border-b border-[#2C3E30] group-hover:border-[#D4AF37] pb-1">
                  記事一覧を見る
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <p className="text-gray-400 col-span-3 text-center">
              Loading latest insights...
            </p>
          ) : (
            posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 100}>
                <Link href={`/blog/${post.slug}`}>
                  <a className="group cursor-pointer flex flex-col h-full">
                    <div className="relative overflow-hidden rounded-sm mb-6 aspect-video bg-gray-100 shadow-sm">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                      {post.featuredImage?.node?.sourceUrl ? (
                        <img
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                          <span className="text-gray-500 font-bold">
                            NDL BLOG
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>

                      <h3 className="text-lg font-bold text-[#2C3E30] mb-3 leading-snug group-hover:text-[#D4AF37] transition-colors font-['Noto_Serif_JP']">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt.replace(/<[^>]+>/g, "")}
                      </p>

                      <div className="mt-auto pt-4">
                        <span className="text-xs font-bold text-[#2C3E30] border-b border-gray-200 group-hover:border-[#D4AF37] pb-0.5 transition-colors">
                          READ MORE
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
