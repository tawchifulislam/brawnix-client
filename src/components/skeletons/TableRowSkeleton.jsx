export default function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="border-b border-slate-200/60 dark:border-slate-800/60">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}
