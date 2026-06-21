import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { getRuntimeDataState } from "@/lib/data-contracts";
import { mockAreaProvider } from "@/lib/providers/mock-area-provider";

type OpportunityPageProps = {
  params: Promise<{
    slug: string;
    opportunityId: string;
  }>;
};

export function generateStaticParams() {
  const paramsResult = mockAreaProvider.getOpportunityRouteParams();
  return paramsResult.ok ? paramsResult.data : [];
}

export async function generateMetadata({ params }: OpportunityPageProps): Promise<Metadata> {
  const { slug, opportunityId } = await params;
  const areaResult = mockAreaProvider.getAreaBySlug(slug);
  const opportunityResult = mockAreaProvider.getOpportunityById(slug, opportunityId);
  const area = areaResult.ok ? areaResult.data : undefined;
  const opportunity = opportunityResult.ok ? opportunityResult.data : undefined;

  if (!area || !opportunity) {
    return {
      title: "Opportunity not found | AreaScope"
    };
  }

  return {
    title: `${opportunity.title} | ${area.identity.displayName}, WA | AreaScope`,
    description: opportunity.summary
  };
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const { slug, opportunityId } = await params;
  const areaResult = mockAreaProvider.getAreaBySlug(slug);
  const opportunityResult = mockAreaProvider.getOpportunityById(slug, opportunityId);
  const area = areaResult.ok ? areaResult.data : undefined;
  const opportunity = opportunityResult.ok ? opportunityResult.data : undefined;

  if (!area || !opportunity) {
    notFound();
  }

  const sourceRecordsResult = mockAreaProvider.getOpportunitySourceRecords(area, opportunity);
  const sourceRecords = sourceRecordsResult.ok ? sourceRecordsResult.data : [];

  return (
    <OpportunityDetail
      area={area}
      opportunity={opportunity}
      opportunityProviderState={getRuntimeDataState(opportunityResult)}
      sourceRecords={sourceRecords}
      sourceRecordsState={getRuntimeDataState(sourceRecordsResult)}
    />
  );
}
