"use client";
import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useResumeStore from "@/store/resume";

export default function UploadAvatar({
  onSuccess,
}: {
  onSuccess?: (img: string) => void;
}) {
  const changeData = useResumeStore((state) => state.changeData);
  const baseInfo = useResumeStore((state) => state.baseInfo);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0];
      //首先判断是否是图片
      if (!/image\/\w+/.test(file.type)) {
        alert("上传的不是图片");
        return false;
      }
      //在此限制图片的大小
      var imgSize = file.size;
      //35160  计算机存储数据最为常用的单位是字节(B)
      //在此处我们限制图片大小为2M
      if (imgSize > 2 * 1024 * 1024) {
        alert("上传的图片的大于2M,请重新选择");
        return false;
      }
      // 创建用来读取此文件的对象
      let reader = new FileReader();
      //使用该对象读取file文件
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        //读取成功后返回的一个参数e，整个的一个进度事件

        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
        //的base64编码格式的地址
        const url = e.target?.result;
        console.log(url);
        if (url) {
          onSuccess?.(url as string);
          changeData({ field: "baseInfo.avatar", value: url as string });
        }
      };
    }
  };

  return (
    <div className="col-span-3 self-end">
      {baseInfo.avatar ? (
        <Button
          variant="destructive"
          onClick={() => changeData({ field: "baseInfo.avatar", value: "" })}
        >
          移除头像
        </Button>
      ) : (
        <Button>
          <Label htmlFor="avatar">上传头像</Label>
        </Button>
      )}

      <input
        style={{ width: 0, height: 0 }}
        onChange={handleChange}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
      />
    </div>
  );
}
