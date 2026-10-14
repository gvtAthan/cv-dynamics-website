import type { ComponentProps, ReactNode } from "react";
import { Icon } from "../Icon";

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: ReactNode;
};

/** Label, helper text and error message around an input. Errors use an icon and text, not colour alone. */
function FieldShell({ id, label, required, helper, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-s text-text-primary font-medium">
        {label}
        {required ? (
          <span className="text-text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="text-text-muted font-normal"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-body-s text-text-danger flex items-start gap-1.5">
          <Icon name="alert-circle" size={18} className="mt-px shrink-0" />
          {error}
        </p>
      ) : (
        helper && (
          <p id={`${id}-helper`} className="text-body-s text-text-muted">
            {helper}
          </p>
        )
      )}
    </div>
  );
}

const control = (error?: string) =>
  `w-full rounded-md border bg-bg-page px-4 text-body-m text-text-primary placeholder:text-text-disabled transition-colors focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-border-focus)] disabled:bg-bg-muted disabled:text-text-disabled ${
    error ? "border-2 border-border-danger" : "border-border-input hover:border-text-secondary"
  }`;

const describedBy = (id: string, error?: string, helper?: string) =>
  error ? `${id}-error` : helper ? `${id}-helper` : undefined;

type Base = { id: string; label: string; required?: boolean; helper?: string; error?: string };

export function TextField({ id, label, required, helper, error, ...rest }: Base & ComponentProps<"input">) {
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error}>
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, helper)}
        className={`${control(error)} h-12`}
        {...rest}
      />
    </FieldShell>
  );
}

export function TextareaField({ id, label, required, helper, error, ...rest }: Base & ComponentProps<"textarea">) {
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error}>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, helper)}
        className={`${control(error)} min-h-32 py-3`}
        {...rest}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  required,
  helper,
  error,
  options,
  placeholder = "Select an option",
  ...rest
}: Base & { options: readonly { value: string; label: string }[]; placeholder?: string } & ComponentProps<"select">) {
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error}>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, helper)}
          className={`${control(error)} h-12 appearance-none pr-12`}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={20}
          className="text-text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        />
      </div>
    </FieldShell>
  );
}

export function Checkbox({
  id,
  label,
  error,
  ...rest
}: { id: string; label: string; error?: string } & ComponentProps<"input">) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-m flex min-h-11 cursor-pointer items-center gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="accent-action-primary size-5 shrink-0 cursor-pointer"
          {...rest}
        />
        <span>
          {label}
          {rest.required && (
            <span className="text-text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="text-body-s text-text-danger flex items-start gap-1.5">
          <Icon name="alert-circle" size={18} className="mt-px shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function FormGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-h4 mb-5">{title}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function Alert({
  tone,
  title,
  children,
  id,
}: {
  tone: "danger" | "success" | "info";
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  const styles = {
    danger: { box: "bg-bg-danger-subtle border-border-danger text-text-danger", icon: "alert-circle" as const },
    success: { box: "bg-bg-success-subtle border-border-success text-text-success", icon: "check-circle" as const },
    info: { box: "bg-bg-brand-subtle border-border-brand text-text-brand", icon: "info" as const },
  }[tone];
  return (
    <div id={id} role={tone === "danger" ? "alert" : "status"} className={`flex gap-3 rounded-md border-l-4 p-4 focus:outline-none ${styles.box}`}>
      <Icon name={styles.icon} size={24} className="shrink-0" />
      <div className="text-body-s text-text-primary">
        <p className="text-body-m font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
}
