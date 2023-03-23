import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Header from "~/components/Header";
import { useState } from "react";
import { Topic } from "@prisma/client";
import NoteEditor from "~/components/NoteEditor";
import NoteCard from "~/components/NoteCard";

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Content />

      </main>

    </>
  );
};

export default Home;

const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const [selectedTopic, selectedTopicSet] = useState<Topic | null>(null);
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      selectedTopicSet(selectedTopic ?? data[0] ?? null);

    }
  });
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => refetchTopics()
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery({ topicId: selectedTopic?.id ?? "" }, {
    enabled: sessionData?.user !== undefined && selectedTopic !== null,
    onSuccess: (data) => {

    }
  });

  const createNote = api.note.create.useMutation({
    onSuccess: () => refetchNotes()
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => refetchNotes()
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => (<li key={topic.id}>
            <a href="#"
              onClick={(event) => {
                event.preventDefault();
                selectedTopicSet(topic);
              }}
            >
              {topic.title}
            </a>
          </li>))}
        </ul>
        <div className="divider" />
        <input type="text" placeholder="New topic"
          className="input-bordered input input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value
              });
              e.currentTarget.value = "";
            }
          }
          }
        />
      </div>
      <div className="col-span-3">        
        <div>
          {notes?.map((note)=>(<div key={note.id}>
            <NoteCard note={note} onDelete={()=>{
              void deleteNote.mutate({noteId:note.id});
            }}/>
          </div>))}

        </div>
        
        <NoteEditor onSave={({ title, code }) => {
          createNote.mutate({
            title,
            content: code,
            topicId: selectedTopic?.id ?? ""

          });

        }} />

      </div>



    </div>
  );
};