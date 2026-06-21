import { absProviderAdapter } from "@/lib/providers/abs-provider";
import { domainProviderAdapter } from "@/lib/providers/domain-provider";
import { waCrimeProviderAdapter } from "@/lib/providers/wa-crime-provider";

export const providerAdapters = [
  domainProviderAdapter,
  absProviderAdapter,
  waCrimeProviderAdapter
] as const;

export type ProviderAdapterId = (typeof providerAdapters)[number]["id"];
