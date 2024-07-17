import { getFileData, saveFileData } from "@src/features/files"

export const NOTE_FILE_DATA_KEY = "note-data"

export type NoteData = {
    text: string
}

export async function addNote(fileKey: string, noteData: NoteData) {
    await saveFileData(fileKey, NOTE_FILE_DATA_KEY, noteData)
}

export const GET_NOTE_QUERY_KEY = "getNote"

export async function getNote(fileKey: string) {
    return (await getFileData(fileKey, NOTE_FILE_DATA_KEY)) as NoteData
}
