import {createContext, useContext, useState, useEffect} from 'react'
import { databases } from '../appwrite'
import {ID, Query} from 'appwrite'

export const IDEAS_DATABABSE_ID = "66b318bd00375cd72ae9";
export const IDEAS_COLLECTION_ID = "66b318f1002f9b321140";

const ideasContext = createContext();

export function useIdeas(){
    return useContext(ideasContext)
}

export function IdeasProvider(props){
    const [ideas, setideas] = useState([])

    async function add(idea){
        const response = await databases.createDocument(
            IDEAS_DATABABSE_ID,
            IDEAS_COLLECTION_ID,
            ID.unique(),
            idea
        )
        setideas((ideas) => [response, ...ideas].slice(1,10))
    }

    async function remove(id){
        await databases.deleteDocument(IDEAS_DATABABSE_ID, IDEAS_COLLECTION_ID, id)
        setideas((ideas) => ideas.filter((idea) => idea.id!==id))
        await init()
    }

    async function init(){
        const response = await databases.listDocuments(
            IDEAS_DATABABSE_ID, IDEAS_COLLECTION_ID,[Query.orderDesc("$createdAt"), Query.limit(10)]
        )

        setideas(response.documents)
    }

    useEffect(() => {
        init()
    },[]);

    return (
        <IdeasProvider.Provider value={{current: ideas, add, remove}} >{props.children}</IdeasProvider.Provider>
    )
}