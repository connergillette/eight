import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Eight" },
    { name: "description", content: "Once-per-day, no-frills daily reflection journal." },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Eight</h1>
    </div>
  );
}
