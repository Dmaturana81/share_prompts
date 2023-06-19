import { connecToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    try {
        await connecToDB();
        // Find the Prompt by Id in the database. Id is passed through the routing system 
        const prompt = await Prompt.findById( params.id ).populate('creator')
        // If prompt doesn exist 
        if(!prompt) {
            return new Response("Prompt Not Found", {status:404})
        }
        // In the case it Exist Return the prompt
        return new Response(JSON.stringify(prompt), {status: 200})

    } catch (error){
        return new Response('Failed to retreive Prompts', {status: 500})

    }
}

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json()
    try {
        await connecToDB()

        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response("Prompt Not Found", {status:404})

        existingPrompt.prompt = prompt 
        existingPrompt.tag = tag
        await existingPrompt.save()
        
        return new Response(JSON.stringify(existingPrompt, {statusbar: 200}))
    
    } catch {
        return new Response("Failed to Update Prompt", {status: 500})
    }
}

export const DELETE = async (request, { params } ) => {
    try {
        await connecToDB()

        const existingPrompt = await Prompt.findByIdAndRemove(params.id)
        return new Response(JSON.stringify(existingPrompt, {statusbar: 200}))
    
    } catch {
        return new Response("Failed to Delete Prompt", {status: 500})
    }
}