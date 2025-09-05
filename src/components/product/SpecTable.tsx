export function SpecTable({ rows }: { rows?: {label:string; value:string}[] }) {
  if (!rows?.length) return null;
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className={i%2 ? "bg-gray-50" : "bg-white"}>
              <td className="p-3 font-medium text-gray-700">{r.label}</td>
              <td className="p-3 text-gray-600">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
