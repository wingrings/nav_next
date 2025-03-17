"use server"
import { db } from "@/db";
import { redirect } from "next/navigation";


export async function getBoxList() {
  const posts = await db.box.findMany();
  return posts
}



export async function addBox(formData: {title: string; memo: string}, fn: () => void) {
  try {
    const newBox = await db.box.create({
      data: {
        title: formData.title,
        memo: formData.memo,
      },
    });
    return newBox
  } catch (error) {
    return error
  } finally {
    fn()
    redirect('/box'); // 确保无论如何都会重定向
  }
}
export async function delDataBox(id: number) {
  await db.box.delete({
    where: {id}
  })
  redirect('/box')
}