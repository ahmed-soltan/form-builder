import { Form } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatDistance } from "date-fns";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">
            {form.name}
          </span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm">
          {formatDistance(form.createdAt , new Date() , {
            addSuffix:true
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView/>
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms/>
              <span>{form.Submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[19px] truncate text-sm">
          {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="mt-2 w-full text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View Submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button variant={"secondary"} asChild className="mt-2 w-full text-md gap-4" size={"sm"}>
            <Link href={`/builder/${form.id}`}>
              Edit Form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
