"use server"
import { db } from "@/db";
import { redirect } from "next/navigation";


export async function getData() {
  const posts = await db.box.findMany();
  return posts
}



export async function add(formData: FormData) {
  await db.box.create({
    data: {
      title: formData.get('title') as string,
      memo: formData.get('code') as string,
    }
  })
  redirect('/dome')
}
export async function delData(id: number) {
  await db.box.delete({
    where: {id}
  })
  redirect('/dome')
}