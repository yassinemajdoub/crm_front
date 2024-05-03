"use client"
import { Button } from '@/components/ui/button';
import { CopyIcon } from "@radix-ui/react-icons"
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"  
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    content: z.string().min(50, {
      message: "Content must be at least 50 characters.",
    }),
})

const Layout = ({children}: {children: ReactNode}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (data: any) => {
        console.log(data)
        if (form.formState.isValid) {
            form.reset();
            form.setValue('title', '');
            form.setValue('content', '');
            document.getElementById('close')?.click(); 
        }
    }

    const handleCopy = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
          navigator.clipboard.writeText(inputRef.current.defaultValue);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="m-10">
            <div className='mb-14 justify-between flex flex-row'>
                <h1 className="text-[#202020] font-semibold text-[24px]">Email Template</h1>
                <div>
                    { isMounted && <Dialog>
                    <DialogTrigger><Button className='py-2 bg-[#1D1DCE] text-[#DBE7FF] text-center font-semibold text-[14px] ' >+ HTML Template</Button></DialogTrigger>
                    <DialogContent className="w-[800px] max-w-[800px]">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                        <DialogTitle className='font-semibold text-[24px]'>HTML Email</DialogTitle>
                        <DialogDescription className='flex flex-row gap-4'>
                            <div className='gap-4 flex flex-col w-[65%]'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className='text-[16px] font-semibold text-black'>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className='text-[16px] font-semibold text-black '>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Write your content here..."
                                            className="resize-none h-[200px]"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            How can you get a HTML template? <a href='#' className='text-[#1D1DCE]'>Learn more</a>
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='border border-input rounded-md w-[35%] p-2 flex flex-col gap-3 overflow-y-scroll scrollbar-thin scrollbar-webkit '>
                                <div className='flex flex-row gap-2'>
                                    <Input
                                    ref={nameRef}
                                    id="name"
                                    className='text-green-700'
                                    defaultValue="<!-- name --!>"
                                    readOnly
                                    />
                                    <Button type="button" size="sm" onClick={() => handleCopy(nameRef)} className='rounded-[4px] bg-[#1D1DCE] p-3 hover:bg-[#081A51]'>
                                    <span className="sr-only">Copy</span>
                                    <CopyIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <Input
                                    ref={emailRef}
                                    id="email"
                                    className='text-blue-700'
                                    defaultValue="<!-- email --!>"
                                    readOnly
                                    />
                                    <Button type="button" size="sm" onClick={() => handleCopy(emailRef)} className='rounded-[4px] bg-[#1D1DCE] p-3 hover:bg-[#081A51]'>
                                    <span className="sr-only">Copy</span>
                                    <CopyIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <Input
                                    ref={linkRef}
                                    id="link"
                                    className='text-yellow-700'
                                    defaultValue="<!-- link --!>"
                                    readOnly
                                    />
                                    <Button type="button" size="sm" onClick={() => handleCopy(linkRef)} className='rounded-[4px] bg-[#1D1DCE] p-3 hover:bg-[#081A51]'>
                                    <span className="sr-only">Copy</span>
                                    <CopyIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button id="close" type="reset" className='rounded-[4px] text-black bg-[#e3e3e36b] p-3 hover:bg-[#e3e3e3]'>Close</Button>
                            </DialogClose>
                            <Button type="submit" className='rounded-[4px] bg-[#1D1DCE] p-3 hover:bg-[#081A51]'>Add</Button>
                        </DialogFooter>
                    </form>
                    </Form>
                    </DialogContent>
                    </Dialog>}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;