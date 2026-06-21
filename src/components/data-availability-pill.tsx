"use client";

import { css } from "styled-system/css";
import { useI18n } from "@/components/i18n-provider";
import { getDataAvailabilityMeta, type DataAvailabilityStatus } from "@/lib/data-contracts";

type DataAvailabilityPillProps = {
  status: DataAvailabilityStatus;
};

const toneStyles: Record<
  ReturnType<typeof getDataAvailabilityMeta>["tone"],
  { background: string; borderColor: string; color: string }
> = {
  blocked: {
    background: "rgba(102, 115, 109, 0.08)",
    borderColor: "rgba(102, 115, 109, 0.22)",
    color: "muted"
  },
  neutral: {
    background: "rgba(102, 115, 109, 0.09)",
    borderColor: "rgba(102, 115, 109, 0.2)",
    color: "muted"
  },
  positive: {
    background: "rgba(17, 97, 76, 0.08)",
    borderColor: "rgba(17, 97, 76, 0.22)",
    color: "eucalyptus"
  },
  warning: {
    background: "rgba(183, 121, 31, 0.1)",
    borderColor: "rgba(183, 121, 31, 0.24)",
    color: "amber"
  }
};

export function DataAvailabilityPill({ status }: DataAvailabilityPillProps) {
  const meta = getDataAvailabilityMeta(status);
  const style = toneStyles[meta.tone];
  const { t } = useI18n();

  return (
    <span
      className={css({
        display: "inline-flex",
        alignItems: "center",
        minH: "26px",
        rounded: "999px",
        border: "1px solid",
        borderColor: style.borderColor,
        bg: style.background,
        color: style.color,
        px: "9px",
        fontSize: "12px",
        fontWeight: 750,
        whiteSpace: "nowrap"
      })}
      title={meta.description}
    >
      {t(`status.${status}`)}
    </span>
  );
}
