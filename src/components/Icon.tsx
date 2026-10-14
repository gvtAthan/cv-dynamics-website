import { iconPaths, type IconName } from "@/data/icons";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  /** Accessible label. Omit for decorative icons (the default). */
  label?: string;
};

export function Icon({ name, size = 24, className, label }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      // Static, trusted markup from src/data/icons.ts.
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  );
}

export type { IconName };
