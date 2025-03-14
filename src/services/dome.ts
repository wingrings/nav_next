"use server"
import { db } from "@/db";
import { redirect } from "next/navigation";

const snippet = db.snippet

export async function getData() {
  const posts = await db.snippet.findMany({
    // include: {
    //   author: true,
    // },
  });
  return posts
}



export async function add(formData: FormData) {
  await snippet.create({
    data: {
      title: formData.get('title') as string,
      code: formData.get('code') as string,
    }
  })
  redirect('/dome')
}
export async function delData(id: number) {
  await snippet.delete({
    where: {id}
  })
  redirect('/dome')
}