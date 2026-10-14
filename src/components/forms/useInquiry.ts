"use client";

import { useRef, useState, type FormEvent } from "react";
import { validate, type Errors, type InquiryKind, type Values } from "@/lib/inquiry";

export type Status = "idle" | "submitting" | "success" | "error";

const readForm = (form: HTMLFormElement): Values => {
  const values: Values = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value === "string") values[key] = value;
  });
  return values;
};

/** Shared submit, validation and status handling for the Contact and Rental forms. */
export function useInquiry(kind: InquiryKind) {
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [sentTo, setSentTo] = useState("");

  const focusAlert = () => requestAnimationFrame(() => alertRef.current?.focus());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = readForm(e.currentTarget);
    const found = validate(kind, values);
    setAttempted(true);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      focusAlert();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...values }),
      });
      if (res.status === 422) {
        const data = (await res.json()) as { errors?: Errors };
        setErrors(data.errors ?? {});
        setStatus("idle");
        focusAlert();
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setSentTo(values.email);
      setStatus("success");
      window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 120 });
    } catch {
      setStatus("error");
      focusAlert();
    }
  };

  /** After the first submit, errors update as the visitor fixes fields. */
  const onChange = () => {
    if (!attempted || !formRef.current) return;
    setErrors(validate(kind, readForm(formRef.current)));
  };

  const reset = () => {
    setStatus("idle");
    setErrors({});
    setAttempted(false);
  };

  return { formRef, alertRef, status, errors, sentTo, onSubmit, onChange, reset };
}
