"use client";

import { useState } from "react";
import BlogSidebar from "./components/BlogSidebar";
import BlogTopHeader from "./components/BlogTopHeader";

// Pages
import PostsListPage from "./pages/PostsListPage";
import NewPostPage from "./pages/NewPostPage";
import TopicsPage from "./pages/TopicsPage";
import MediaPage from "./pages/MediaPage";

export default function BlogDashboardPage() {
  const [activePage, setActivePage]   = useState("posts");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const goToEditor = (post = null) => {
    setEditingPost(post);
    setActivePage("new-post");
  };

  const renderPage = () => {
    switch (activePage) {
      case "posts":
        return (
          <PostsListPage
            onNewPost={() => goToEditor(null)}
            onEditPost={(post) => goToEditor(post)}
          />
        );
      case "new-post":
        return (
          <NewPostPage
            key={editingPost?._id ?? "new"}
            initialPost={editingPost}
            onBack={() => { setEditingPost(null); setActivePage("posts"); }}
          />
        );
      case "topics":
        return <TopicsPage />;
      case "media":
        return <MediaPage />;
      default:
        return <PostsListPage onNewPost={() => goToEditor(null)} onEditPost={(post) => goToEditor(post)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] p-2 sm:p-4 lg:p-6">
      <div
        className="relative mx-auto max-w-full bg-[#FAFAF8] rounded-2xl lg:rounded-3xl flex overflow-hidden"
        style={{ minHeight: "calc(100vh - 48px)" }}
      >
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <BlogSidebar
          active={activePage}
          onChange={(page) => {
            if (page === "new-post") {
              goToEditor(null);
            } else {
              setActivePage(page);
            }
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <BlogTopHeader
            activePage={activePage}
            onMenuClick={() => setSidebarOpen(true)}
            onNewPost={() => setActivePage("new-post")}
          />

          <div className="flex-1 overflow-y-auto">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}