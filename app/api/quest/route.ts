import { NextRequest, NextResponse } from "next/server";

import { allQuestList,addAQuest } from "@/data/firestore.mjs";

//모든 할 일 가져오기
export async function GET(request: NextRequest) {
  
  const allQuest = await allQuestList();

  const response = {
    message: "todos 몽땅 가져오기",
    data: allQuest,
  };

  return NextResponse.json(response, { status: 200 });
}

//할 일 추가
export async function POST(request: NextRequest) {
  const { title, type } = await request.json();

  if (title === undefined) {
    const errMessage = {
      message: "title을 작성해주세요.",
    };

    return NextResponse.json(errMessage, { status: 422 });
  }

  const addedQuest = await addAQuest({ title, type });

  const response = {
    message: "할일 추가 성공",
    data: addedQuest,
  };

  return NextResponse.json(response, { status: 201 });
}