"use server"
import { db } from "@/db";


export async function getBoxList() {
  const posts = await db.box.findMany();
  return posts
}



export async function addBox(formData: {title: string; memo: string}) {
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
  }
}
export async function delDataBox(id: number) {
  try {
    const newBox = await db.box.delete({
      where: {id}
    })
    return newBox
  } catch (error) {
    return error
  }
}