"use client";
import {
  FieldPath,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import BaseInfoFormItem from "./BasicFormItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FormField, Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, X } from "lucide-react";
import UploadAvatar from "./UploadAvatar";
import { BaseInfoSchemaType, baseInfoSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useResumeStore from "@/store/resume";
import { useSyncFields } from "./hooks";

export type FieldOption = {
  name: FieldPath<BaseInfoSchemaType>;
  label: string;
  type: "input" | "select" | "textarea";
  rows?: number;
};

const baseInfoFields: FieldOption[] = [
  {
    name: "baseInfo.job",
    label: "职位名称",
    type: "input",
  },
  {
    name: "baseInfo.name",
    label: "姓名",
    type: "input",
  },
  {
    name: "baseInfo.jobAddress",
    label: "工作地点",
    type: "input",
  },
  {
    name: "baseInfo.phone",
    label: "手机号码",
    type: "input",
  },
  {
    name: "baseInfo.email",
    label: "邮箱",
    type: "input",
  },
  {
    name: "baseInfo.birthday",
    label: "出生日期",
    type: "input",
  },
  {
    name: "baseInfo.weChat",
    label: "微信号",
    type: "input",
  },
];

export default function BaseInfoForm() {
  const baseInfo = useResumeStore((state) => state.baseInfo);
  const form = useSyncFields(baseInfoSchema, { baseInfo });
  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-3">
        <Card className="">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">个人信息</CardTitle>
            <CardDescription>包含你的个人信息以及联系方式</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-x-8 gap-y-2 px-4 md:grid-cols-6">
            {baseInfoFields.map((field) => (
              <BaseInfoFormItem
                key={field.name}
                form={form}
                {...field}
                className=" col-span-3"
              />
            ))}
            <UploadAvatar />
          </CardContent>
        </Card>
        <CustomUrls />
        <Card className="">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">个人简介</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <FormField
              control={form.control}
              name="baseInfo.introduce"
              render={({ field }) => (
                <Textarea placeholder="请输入个人简介" rows={5} {...field} />
              )}
            />
          </CardContent>
        </Card>
        <CommonListTags name="baseInfo.hobby" key="hobby" title="爱好" />
        <CommonListTags
          name="baseInfo.certificate"
          key="certificate"
          title="证书"
        />
      </div>
    </Form>
  );
}

const CommonListTags = (props: {
  name: "baseInfo.hobby" | "baseInfo.certificate";
  title: string;
}) => {
  const { name, title } = props;
  const form = useFormContext<BaseInfoSchemaType>();
  return (
    <Card className="">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-y-3">
                <Input
                  placeholder="输入后按确定添加"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (!e.currentTarget.value.trim()) return;
                      field.onChange([
                        ...(field.value ?? []),
                        e.currentTarget.value,
                      ]);
                      e.currentTarget.value = "";
                      e.preventDefault();
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {field.value?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-solid border-primary px-3 py-1"
                    >
                      {item}
                      <X
                        size={14}
                        className="ml-1 cursor-pointer text-primary"
                        onClick={() =>
                          field.onChange(
                            field.value?.filter((_, i) => i !== index),
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
      </CardContent>
    </Card>
  );
};

const CustomUrls = () => {
  const form = useFormContext<BaseInfoSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "baseInfo.customUrls",
  });
  const onAddCustomUrls = () => {
    append({ name: "", url: "" });
  };
  return (
    <Card className="">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">自定义内容</CardTitle>
        <CardDescription>你可以在下方区域添加任何链接或者文本</CardDescription>
      </CardHeader>
      <CardContent className=" px-4">
        <div className="flex flex-col gap-y-2">
          {fields?.map((item, index) => (
            <div key={index} className="flex items-center gap-x-2">
              {/* {item.name}-{item.url} */}
              <Input
                className="w-1/3"
                {...form.register(`baseInfo.customUrls.${index}.name`)}
              />
              <Input
                {...form.register(`baseInfo.customUrls.${index}.url`)}
                type="url"
              />
              <MinusCircle
                className=" cursor-pointer text-red-500"
                onClick={() => remove(index)}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          variant="link"
          className="p-0"
          onClick={onAddCustomUrls}
          type="button"
        >
          添加
        </Button>
      </CardFooter>
    </Card>
  );
};
