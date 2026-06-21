import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaWorkspace } from "@/components/area-workspace";
import { getRuntimeDataState } from "@/lib/data-contracts";
import { mockAreaProvider } from "@/lib/providers/mock-area-provider";

type AreaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const areasResult = mockAreaProvider.getAreas();
  if (!areasResult.ok) {
    return [];
  }

  return areasResult.data.map((area) => ({
    slug: area.identity.slug
  }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const areaResult = mockAreaProvider.getAreaBySlug(slug);
  const area = areaResult.ok ? areaResult.data : undefined;

  if (!area) {
    return {
      title: "Area not found | AreaScope"
    };
  }

  return {
    title: `${area.identity.displayName}, WA | AreaScope`,
    description: area.summary
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const areaResult = mockAreaProvider.getAreaBySlug(slug);
  const area = areaResult.ok ? areaResult.data : undefined;
  const identityMappingsResult = mockAreaProvider.getAreaIdentityMappings();
  const identityMappings = identityMappingsResult.ok ? identityMappingsResult.data : [];

  if (!area) {
    notFound();
  }

  return (
    <AreaWorkspace
      area={area}
      identityMapping={identityMappings.find((mapping) => mapping.areaSlug === area.identity.slug)}
      identityProviderState={getRuntimeDataState(identityMappingsResult)}
      providerState={getRuntimeDataState(areaResult)}
    />
  );
}
