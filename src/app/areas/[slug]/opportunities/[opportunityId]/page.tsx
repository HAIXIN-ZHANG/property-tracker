import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { getAreaBySlug, getOpportunityById, getOpportunityRouteParams } from "@/lib/areas";

type OpportunityPageProps = {
  params: Promise<{
    slug: string;
    opportunityId: string;
  }>;
};

export function generateStaticParams() {
  return getOpportunityRouteParams();
}

export async function generateMetadata({ params }: OpportunityPageProps): Promise<Metadata> {
  const { slug, opportunityId } = await params;
  const area = getAreaBySlug(slug);
  const opportunity = getOpportunityById(slug, opportunityId);

  if (!area || !opportunity) {
    return {
      title: "Opportunity not found | property-tracker"
    };
  }

  return {
    title: `${opportunity.title} | ${area.identity.displayName}, WA`,
    description: opportunity.summary
  };
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const { slug, opportunityId } = await params;
  const area = getAreaBySlug(slug);
  const opportunity = getOpportunityById(slug, opportunityId);

  if (!area || !opportunity) {
    notFound();
  }

  return <OpportunityDetail area={area} opportunity={opportunity} />;
}
