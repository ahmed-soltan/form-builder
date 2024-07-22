import { getFormById } from "@/actions/getFormById";
import { getFormWithSubmissions } from "@/actions/getFormWithSubmissions";
import DeleteFormBtn from "@/components/buttons/delete-form-btn";
import VisitBtn from "@/components/buttons/visits-btn";
import FormShareLink from "@/components/form-share-link";
import { ElementsType, FormElementInstance } from "@/components/form/form-elements";

import StatesCard from "@/components/formStatus/states-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import React from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";

const BuilderPage = async ({ params }: { params: { formId: string } }) => {
  const form = await getFormById(params.formId);

  if (!form) {
    throw new Error("Form Not Found");
  }

  const { visits, Submissions } = form;

  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = (Submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionsRate;

  return (
    <>
      <div className="py-8 border-b dark:border-slate-800">
        <div className="flex justify-between container items-center">
          <h1 className="text-2xl lg:text-4xl font-bold truncate">
            {form.name}
          </h1>
          <div className="flex items-center gap-2">
            <VisitBtn shareLink={form.shareLink} />
            <DeleteFormBtn id={form.id} />
          </div>
        </div>
      </div>
      <div className="py-4 border-b dark:border-slate-800">
        <div className="container flex items-center justify-between gap-2">
          <FormShareLink shareLink={form.shareLink} />
        </div>
      </div>
      <div className="container pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatesCard
          title={"Total Visits"}
          icon={<LuView className="text-blue-600" />}
          helperText={"All Time Form Visits"}
          value={visits?.toLocaleString() || ""}
          className={"shadow-md shadow-blue-600"}
          loading={false}
        />
        <StatesCard
          title={"Total Submissions"}
          icon={<FaWpforms className="text-yellow-600" />}
          helperText={"All Time Form Submissions"}
          value={Submissions?.toLocaleString() || ""}
          className={"shadow-md shadow-yellow-600"}
          loading={false}
        />
        <StatesCard
          title={"Submissions Rate"}
          icon={<HiCursorClick className="text-green-600" />}
          helperText={"Visits that Result in form submission"}
          value={submissionsRate?.toLocaleString() + "%" || ""}
          className={"shadow-md shadow-green-600"}
          loading={false}
        />
        <StatesCard
          title={"Bounce Rate"}
          icon={<TbArrowBounce className="text-red-600" />}
          helperText={"Visits that Leaves without interacting"}
          value={bounceRate?.toLocaleString() + "%" || ""}
          className={"shadow-md shadow-red-600"}
          loading={false}
        />
      </div>

      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
};

export default BuilderPage;

type Row = {
  [key: string]: string;
} & {
  submittedAt: Date;
};


const SubmissionsTable = async ({ id }: { id: number }) => {
  const form = await getFormWithSubmissions(id);

  console.log(form);

  if (!form) {
    throw new Error("Form Not Found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "textField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || element.id,
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];

  form.formSubmission.forEach((row) => {
    const content = JSON.parse(row.content);
    rows.push({
      ...content,
      submittedAt: row.createdAt,
    });
  });

  console.log(form.formSubmission)

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-right uppercase text-slate-700 dark:text-slate-500">
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}

                <TableCell className="text-right text-slate-700 dark:text-slate-500">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

const RowCell = ({ type, value }: { type: ElementsType; value: string }) => {
  let node: React.ReactNode = value;

  return <TableCell>{node}</TableCell>;
};
