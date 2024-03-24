"use client";

import React, { useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

function TanstackProvider({
  children,
}: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}

export default TanstackProvider;
