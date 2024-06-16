"use client"

import {Dispatch, FormEventHandler, ReactNode, SetStateAction} from "react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface ActionDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    content: ReactNode,
    onSubmit: FormEventHandler<HTMLFormElement>,
    title: string,
    submitBtnText?: string
}

export default function ActionDialog({open, setOpen, content, onSubmit, title, submitBtnText}: ActionDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-teal-900 text-white border-4 border-teal-950">
                <form onSubmit={onSubmit}>
                    <DialogHeader className="border-b-2 border-white pb-4">
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {content}
                    <DialogFooter className="py-2">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary"
                                    className="bg-red-700 border-2 border-red-900 text-white hover:bg-red-800">Close</Button>
                        </DialogClose>
                        <Button type="submit"
                                className="bg-teal-500 hover:bg-teal-600 border-2 border-teal-800">{submitBtnText ? submitBtnText : "Create"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
