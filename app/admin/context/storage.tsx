"use client";
import React, {useContext, useState, useEffect, createContext} from "react";
import {app} from "@/config/firebase";
import * as z from "zod";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import {UpdateRequest, Note} from "@/app/admin/types";
import {tr} from "date-fns/locale";
import {Post} from "@/app/admin/types";

type ResponseStatus = "success" | "error";

interface StorageContextType {
  CreateUpdateRequest: (
    updateRequest: UpdateRequest
  ) => Promise<ResponseStatus>;
  FetchUpdateRequests: () => Promise<UpdateRequest[]>;
  DeleteUpdateRequest: (id: string) => Promise<ResponseStatus>;
  CreateNote: (note: Note) => void;
  FetchNotes: () => Promise<Note[]>;
  DeleteNote: (id: string) => void;
  changeUpdateRequestStatus: (
    id: string,
    status: "pending" | "in progress" | "completed" | "rejected"
  ) => void;
  CreateBlogPost: () => Promise<{id: string} | "error">;
  FindBlogPost: (id: string) => Promise<any>;
  SaveBlogPost: (
    id: string,
    post: {title: string; content: any}
  ) => Promise<ResponseStatus>;
  GetBlogPosts: () => Promise<Post[]>;
  DeleteBlogPost: (id: string) => Promise<ResponseStatus>;
}

const StorageContext = createContext<StorageContextType | null>(null);

export function useAdminStorage() {
  return useContext(StorageContext);
}

export const db = getFirestore(app);

export function AdminStorageProvider({children}: {children: React.ReactNode}) {
  // Update Requests actions

  const CreateUpdateRequest = async (
    updateRequest: UpdateRequest
  ): Promise<ResponseStatus> => {
    try {
      await setDoc(
        doc(db, `admin/updateRequests/active/${updateRequest.id}`),
        updateRequest
      );
      return "success";
    } catch (err) {
      return "error";
    }
  };

  const FetchUpdateRequests = async (): Promise<UpdateRequest[]> => {
    const updateRequests = await getDocs(
      collection(db, "admin/updateRequests/active")
    );
    const allUpdateRequests = updateRequests.docs.map((doc) => doc.data());

    return allUpdateRequests as UpdateRequest[];
  };

  const DeleteUpdateRequest = async (id: string): Promise<ResponseStatus> => {
    try {
      await deleteDoc(doc(db, "admin/updateRequests/active", id));
      return "success";
    } catch {
      return "error";
    }
  };

  const changeUpdateRequestStatus = async (
    id: string,
    status: "pending" | "in progress" | "completed" | "rejected"
  ) => {
    const updateRequestRef = doc(db, "admin/updateRequests/active", id);
    await updateDoc(updateRequestRef, {
      status: status,
    });
  };

  //  Note actions

  const CreateNote = async (note: Note) => {
    const response = await setDoc(
      doc(db, `admin/notes/active/${note.id}`),
      note
    );
    return response;
  };

  const FetchNotes = async (): Promise<Note[]> => {
    const notes = await getDocs(collection(db, "admin/notes/active"));

    const allNotes = notes.docs.map((doc) => doc.data());

    return allNotes as Note[];
  };

  const DeleteNote = async (id: string) => {
    const response = await deleteDoc(doc(db, "admin/notes/active", id));

    return response;
  };

  // Blog actions
  // const CreateBlogPost = async (post: z.infer<typeof postCreateSchema>) => {

  const CreateBlogPost = async () => {
    try {
      const response = await addDoc(collection(db, "admin/blog/posts"), {
        title: "Untitled Post",
        content: "",
        published: false,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      });
      return {id: response.id};
    } catch {
      return "error";
    }
  };

  const FindBlogPost = async (id: string) => {
    const post = await getDoc(doc(db, "admin/blog/posts", id));
    return {id: id, ...post.data()};
  };

  const SaveBlogPost = async (
    id: string,
    post: {title: string; content: any}
  ) => {
    try {
      const response = await updateDoc(doc(db, "admin/blog/posts", id), {
        title: post.title,
        content: post.content,
        updatedAt: new Date().toDateString(),
      });
      return "success";
    } catch {
      return "error";
    }
  };

  const GetBlogPosts = async () => {
    const posts = await getDocs(collection(db, "admin/blog/posts"));
    const allPosts = posts.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return allPosts as Post[];
  };

  const DeleteBlogPost = async (id: string) => {
    try {
      const response = await deleteDoc(doc(db, "admin/blog/posts", id));
      return "success";
    } catch {
      return "error";
    }
  };

  const value = {
    CreateUpdateRequest,
    FetchUpdateRequests,
    DeleteUpdateRequest,
    CreateNote,
    FetchNotes,
    DeleteNote,
    changeUpdateRequestStatus,
    CreateBlogPost,
    FindBlogPost,
    SaveBlogPost,
    GetBlogPosts,
    DeleteBlogPost,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
