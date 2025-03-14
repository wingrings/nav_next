"use server"
import { db } from "@/db";
import { redirect } from "next/navigation";


export async function getData() {
  const posts = await db.snippet.findMany({
    // include: {
    //   author: true,
    // },
  });
  return posts
}



export async function add(formData: FormData) {
  await db.snippet.create({
    data: {
      title: formData.get('title') as string,
      code: formData.get('code') as string,
    }
  })
  redirect('/dome')
}
export async function delData(id: number) {
  await db.snippet.delete({
    where: {id}
  })
  redirect('/dome')
}