"use client"

import ActionDialog from "@/components/dialogs/actionDialog";
import {Dispatch, FormEvent, SetStateAction, useRef, useState} from "react";
import {useMutation,} from "@tanstack/react-query";
import {generateUrlHandler, GenerateUrlParams} from "@/lib/api/generateUrl";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface GenerateUrlDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    graph: GenerateUrlParams
}

export default function GenerateUrlDialog({open, setOpen, graph}: GenerateUrlDialogProps) {

    const [link, setLink] = useState("")
    const ref = useRef<HTMLInputElement | null>(null)

    const mutation = useMutation({
        mutationFn: generateUrlHandler,
        onSuccess: (res) => {
            const url = "http://localhost:3000/?q=" + res.data.url
            setLink(url)
        }
    })

    const copy = () => {
        if(ref.current) {
            navigator.clipboard.writeText(ref.current.value)
        }
    }

    const content = <>
        <div className="grid w-full items-center gap-3 py-4">
            <Label htmlFor="node-name">Generated Link</Label>
            <div className="flex gap-4">
                <Input ref={ref} className="text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300"
                       id="node-name" disabled={true} value={link}/>
                <Button onClick={copy} className="bg-blue-600 border-2 border-blue-800 hover:bg-blue-700">Copy</Button>
            </div>

        </div>
    </>

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(graph)
    }

    return (
        <ActionDialog open={open} setOpen={setOpen} content={content} onSubmit={onSubmit}
                      title="Generate url for sharing graph" submitBtnText="Generate"/>
    )
}
