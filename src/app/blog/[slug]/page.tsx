import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — OHIHO`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      <article className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/blog"
          className="text-sm font-medium text-accent-cyan hover:underline"
        >
          ← Toutes les ressources
        </Link>

        <div className="mt-6">
          <span className="text-xs font-mono text-accent-cyan">
            {post.category}
          </span>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.readTime} de lecture</span>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 card-surface rounded-2xl p-8 text-center">
          <h2 className="text-lg font-semibold">
            Une question sur ce sujet dans votre entreprise ?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Nous proposons des formations et un accompagnement sur-mesure pour
            vos équipes.
          </p>
          <Link
            href="/#contact"
            className="mt-5 inline-block rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Demander un devis
          </Link>
        </div>
      </article>
    </main>
  );
}
