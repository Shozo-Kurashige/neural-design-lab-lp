import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getPostBySlug } from "@/lib/wordpress";
import { ArrowLeft, Calendar, Home, List } from "lucide-react";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getPostBySlug(slug).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="animate-pulse text-[#00FFCC] font-mono">Loading...</div>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p>記事が見つかりません</p>
        <Link href="/blog">
          <a className="ml-4 text-[#00FFCC] underline">一覧に戻る</a>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 py-8 px-4 md:px-6">
      <nav className="max-w-2xl mx-auto mb-8 flex justify-between text-xs md:text-sm">
        <Link href="/">
          <a className="flex items-center gap-2 text-gray-500 hover:text-[#00FFCC] transition-colors">
            <Home className="w-4 h-4" />
            TOP
          </a>
        </Link>
        <Link href="/blog">
          <a className="flex items-center gap-2 text-gray-500 hover:text-[#00FFCC] transition-colors">
            <List className="w-4 h-4" />
            記事一覧
          </a>
        </Link>
      </nav>

      <article className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center text-xs text-[#00FFCC] mb-6 font-mono tracking-wider opacity-80">
            <span className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-xl md:text-3xl font-bold leading-relaxed mb-8 font-['Noto_Serif_JP'] text-white">
            {post.title}
          </h1>

          {post.featuredImage?.node?.sourceUrl && (
            <div className="rounded-sm overflow-hidden border border-gray-800 mb-10">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          )}
        </div>

        <div
          className="prose prose-invert prose-green max-w-none 
          text-base leading-8 text-gray-300 font-light
          headings:font-bold headings:text-white headings:mt-10 headings:mb-4 headings:text-xl
          p:mb-6 p:text-justify
          a:text-[#00FFCC] a:no-underline hover:a:underline
          strong:text-white strong:font-bold
          img:rounded-sm img:my-8 border-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="max-w-2xl mx-auto mt-24 pt-10 border-t border-gray-900">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/blog">
            <a className="w-full md:w-auto px-8 py-3 border border-[#333] bg-[#0a0a0a] text-gray-400 text-sm font-medium rounded-full hover:border-[#00FFCC] hover:text-[#00FFCC] transition-all duration-300 flex items-center justify-center gap-2 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              記事一覧へ
            </a>
          </Link>

          <Link href="/">
            <a className="w-full md:w-auto px-8 py-3 border border-[#333] bg-[#0a0a0a] text-gray-400 text-sm font-medium rounded-full hover:border-white hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              TOPへ戻る
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
