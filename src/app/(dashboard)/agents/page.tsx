import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import AgentsView from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
function Page() {
  const queryCLient = getQueryClient();
  void queryCLient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryCLient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agents"
            description="This may take few seconds depending on the number of agents."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Failed to load agents"
              description="Please try again later."
            />
          }
        >
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}

export default Page;
