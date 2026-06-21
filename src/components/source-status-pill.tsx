"use client";

import { css } from "styled-system/css";
import { getSourceStatusMeta, type SourceStatus } from "@/lib/source-status";
import { useI18n } from "@/components/i18n-provider";

type SourceStatusPillProps = {
  status: SourceStatus;
};

export function SourceStatusPill({ status }: SourceStatusPillProps) {
  const meta = getSourceStatusMeta(status);
  const { t } = useI18n();

  return (
    <span
      className={css({
        display: "inline-flex",
        alignItems: "center",
        minH: "26px",
        rounded: "999px",
        border: "1px solid",
        borderColor: meta.borderColor,
        bg: meta.background,
        color: meta.color,
        px: "9px",
        fontSize: "12px",
        fontWeight: 750,
        whiteSpace: "nowrap"
      })}
    >
      {t(`status.${status}`)}
    </span>
  );
}
