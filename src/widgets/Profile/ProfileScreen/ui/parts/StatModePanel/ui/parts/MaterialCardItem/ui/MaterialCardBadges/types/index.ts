export type MaterialCardBadgesProps = {
    tasksCount: number;
    accentColor: string;
    chipBorder: string;
    levelLabel?: string;
    levelScheme?: "green" | "yellow" | "red";
    showStatusBadge: boolean;
    statusLabel: string;
    statusBg: string;
    statusBorderColor: string;
    statusTextColor: string;
    authorUsername: string;
    authorName?: string;
    dateLabel?: string;
    dateIso?: string;
};