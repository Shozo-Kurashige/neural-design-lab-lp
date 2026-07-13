import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getAllPosts } from "@/lib/wordpress";
import { Calendar, Home } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-[#00FFCC] font-mono">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 border-b border-[#00FFCC] pb-4 gap-4">
          <h1 className="text-xl md:text-3xl font-bold">
            Neural Design Lab ブログ
          </h1>

          <Link href="/">
            <a className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00FFCC] transition-colors border border-gray-800 px-4 py-2 rounded-full hover:border-[#00FFCC]">
              <Home className="w-4 h-4" />
              TOPへ戻る
            </a>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="group block border border-gray-800 rounded-lg overflow-hidden hover:border-[#00FFCC] transition-colors duration-300 bg-[#0a0a0a]">
                {post.featuredImage?.node?.sourceUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-[#00FFCC] mb-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>

                  <h2 className="text-lg md:text-xl font-bold mb-3 group-hover:text-[#00FFCC] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <div
                    className="text-gray-400 text-sm line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.replace(/<[^>]+>/g, ""),
                    }}
                  />
                </div>
              </a>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-900 text-center">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FFCC] transition-colors text-sm">
              <Home className="w-4 h-4" />
              TOPへ戻る
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
