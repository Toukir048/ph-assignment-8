export function SectionTitle({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">{title}</h2>
      {text ? <p className="mt-3 text-ink/65">{text}</p> : null}
    </div>
  );
}
