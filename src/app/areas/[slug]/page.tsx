import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaWorkspace } from "@/components/area-workspace";
import { getAreaBySlug, getAreas } from "@/lib/areas";

type AreaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAreas().map((area) => ({
    slug: area.identity.slug
  }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    return {
      title: "Area not found | property-tracker"
    };
  }

  return {
    title: `${area.identity.displayName}, WA | property-tracker`,
    description: area.summary
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return <AreaWorkspace area={area} />;
}
