// import Link from 'next/link';
// import { staticRouter } from '@/static/staticRouter';
// import { Result } from 'next';

import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
export default function NotFound() {
  return (
    <Tooltip content="找不到资源">
      <Button>404</Button>
    </Tooltip>
  );
}
