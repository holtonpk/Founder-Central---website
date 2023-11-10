import React from "react";
import EditorLayout from "./editor-layout";

interface EditorPageProps {
  params: {postId: string};
}

const EditorPage = ({params}: EditorPageProps) => {
  return <EditorLayout postId={params.postId} />;
};

export default EditorPage;
