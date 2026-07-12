import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Ressources & pédagogie — OHIHO",
  description:
    "Des articles clairs sur l'intelligence artificielle, la cybersécurité et le cloud, pour comprendre les nouvelles technologies sans jargon.",
};

export default function BlogPage() {
  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Ressources
          </h1>
          <p className="mt-4 text-balance text-4xl font-semibold tracking-tight">
            De la pédagogie sur les nouvelles technologies
          </p>
          <p className="mt-4 text-muted">
            Des explications claires, sans jargon, pour comprendre les outils
            numériques qui transforment le quotidien des entreprises.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-surface group flex flex-col rounded-2xl p-7 transition-colors hover:border-accent-cyan/40"
            >
              <span className="text-xs font-mono text-accent-cyan">
                {post.category}
              </span>
              <h2 className="mt-3 text-lg font-semibold leading-snug">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-muted">
                <span>{post.readTime} de lecture</span>
                <span className="text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Lire →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
