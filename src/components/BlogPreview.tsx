import Link from "next/link";
import { posts } from "@/lib/posts";

export default function BlogPreview() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-violet">
              Ressources
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              De la pédagogie sur les nouvelles technologies
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 text-sm font-medium text-accent-cyan hover:underline"
          >
            Voir toutes les ressources →
          </Link>
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
              <h3 className="mt-3 text-lg font-semibold leading-snug">
                {post.title}
              </h3>
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
    </section>
  );
}
