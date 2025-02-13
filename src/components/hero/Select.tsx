"use client";
import { Select, SelectItem } from "@heroui/react";
interface ListItem {
  label: string;
  value: string;
}
interface AppProps {
  items: ListItem[];
  [key: string]: unknown;
}

export default function App({ items, ...props }: AppProps) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select className="max-w-xs" label={<span></span>} {...props}>
        {items.map((item) => (
          <SelectItem key={item.value}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
