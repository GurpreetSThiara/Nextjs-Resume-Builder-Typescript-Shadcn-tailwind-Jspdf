"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CustomPersonalInformation, CustomPersonalInformationItem } from "@/lib/types"
import { Dialog } from "@/components/Dialog/Dialog"
import { DialogContent } from "@/components/Dialog/DialogContent"
import { DialogTrigger } from "@/components/Dialog/DialogTrigger"
import { DialogHeader } from "@/components/Dialog/DialogHeader"
import { DialogTitle } from "@/components/Dialog/DialogTitle"
import { DialogFooter } from "@/components/Dialog/DialogFooter"
import { Checkbox } from "@/components/checkbox/Checkbox"
import { isValidURL } from "@/utils/urlUtils"

interface AddCustomInfoDialogProps {
    onAdd: ({data,key}:{data:CustomPersonalInformationItem,key:string}) => void
}

export function AddCustomInfoDialog({ onAdd }: AddCustomInfoDialogProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [open, setOpen] = useState(false)
    const [isLink , setIsLink] = useState(false);

    const handleSubmit = () => {
        if (!title || !content) {
            alert("title or content should not be empty");
            return};
    
        if (isLink && !isValidURL(content)) {
            alert("Invalid link! Please enter a valid URL starting with http or https.");
            return;
        }
    
        onAdd({
            data: {
                id: Date.now().toString(),
                title,
                content,
                hidden: false,
                link: isLink
            },
            key: title
        });
    
        setTitle("");
        setContent("");
        setIsLink(false);
        setOpen(false);
    };
    

    return (
        <Dialog>
            <DialogTrigger>
                <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                    Add Custom Field
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Custom Personal Information</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Website" />
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Input
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="e.g., www.example.com"
                        />
                    </div>
                       <Checkbox
                                      id="isLink"
                                      label="Link"
                                      checked={isLink}
                                      onChange={() =>setIsLink(!isLink)}
                                    />
                </div>
                <DialogFooter>
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        Add
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

