import CreateFormButton from "@/components/buttons/create-form-button";
import FormCardSkeleton from "@/components/form/form-card-skeleton";
import FormCards from "@/components/form/form-cards";
import CardStatesWrapper from "@/components/formStatus/card-states-wrapper";
import StatesCards from "@/components/formStatus/states-cards";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatesCards loading={true} />}>
        <CardStatesWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
