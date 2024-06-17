"use client"

import ActionDialog from "@/components/dialogs/actionDialog";
import {Dispatch, FormEvent, SetStateAction} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteGraphHandler} from "@/lib/api/deleteGraph";
import {AxiosResponse} from "axios";
import {GraphResponse} from "@/components/graph/graphList";

interface DeleteGraphDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    graphId: string
}

export default function DeleteGraphDialog({open, setOpen, graphId}: DeleteGraphDialogProps) {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteGraphHandler,
        onSuccess: (_data, variables) => {
            queryClient.setQueryData(["graphs"], (queryData: AxiosResponse) => {
                const graphList = queryData.data.graphs
                const newGraphList = graphList.filter((graph: GraphResponse) => graph._id !== variables.graphId)
                return {...queryData, data: {"graphs": [...newGraphList]}}
            })
            setOpen(false)
        }
    })

    const content = <>
        <p className="py-2">Graph data will be erased</p>
    </>

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate({graphId})
    }

    return (
        <ActionDialog open={open} setOpen={setOpen} content={content} onSubmit={onSubmit}
                      title="Are you sure, you want to delete this graph?" submitBtnText="Delete"/>
    )
}
