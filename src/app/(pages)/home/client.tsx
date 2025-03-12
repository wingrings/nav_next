"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function Client() {
  const [num, setNum] = useState(0);
  const domRef = useRef<any>(null);

  useEffect(() => {
    console.log("useEffect", domRef.current);
  });
  useLayoutEffect(() => {
    console.log("useLayoutEffect", domRef.current);
  });

  return (
    <div>
      <p ref={domRef}>{num}</p>
      <button className="border rounded p-10" onClick={() => setNum(num + 1)}>
        +1
      </button>
    </div>
  );
}
