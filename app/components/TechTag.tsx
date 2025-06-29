type TechTagProps = {
  name: string;
};

export default function TechTag({ name }: TechTagProps) {
  return (
    <span className="bg-slate-300 dark:bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full">
      {name}
    </span>
  );
}