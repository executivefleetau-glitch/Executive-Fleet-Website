"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";

// Force load fonts
import { DM_Sans, Playfair_Display } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "800"] });

export default function AdminBlogPreviewPage() {
    const searchParams = useSearchParams();
    const blogId = searchParams.get("id");
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mode 1: Local Preview (Unsaved changes from New/Edit page)
        const isLocal = searchParams.get("local") === "true";
        if (isLocal) {
            const localData = localStorage.getItem("preview-blog-data");
            if (localData) {
                try {
                    const parsed = JSON.parse(localData);
                    setBlog(parsed);
                } catch (e) {
                    console.error("Failed to parse local preview data", e);
                }
            }
            setLoading(false);
            return;
        }

        // Mode 2: Fetch by ID (Saved blogs)
        if (!blogId) return;

        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/admin/blogs/${blogId}`);
                if (res.ok) {
                    const data = await res.json();
                    setBlog(data.blog);
                }
            } catch (error) {
                console.error("Preview fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId, searchParams]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>Loading Preview...</div>;
    if (!blog) return <div style={{ textAlign: 'center', padding: '50px' }}>Blog not found</div>;

    return (
        <div className={`${dmSans.className} preview-container`}>
            <style jsx global>{`
        body { margin: 0; background: white; }
        h1, h2, h3, h4, h5, h6 { font-family: ${playfair.style.fontFamily}, serif; }
      `}</style>
            <link rel="stylesheet" href="/styles/blog-post.css" />
            <BlogDetail blog={blog} relatedBlogs={[]} />
        </div>
    );
}
