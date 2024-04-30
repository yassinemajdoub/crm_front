"use client"
import { Button } from '@/components/ui/button';
import React, { ReactNode } from 'react';
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
    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className="m-10">
            <div className='mb-14 justify-between flex flex-row'>
                <h1 className="text-[#202020] font-semibold text-[24px]">Email Template</h1>
                <div>
                    <Dialog>
                    <DialogTrigger><Button className='py-2 bg-[#1D1DCE] text-[#DBE7FF] text-center font-semibold text-[14px] ' >+ HTML Template</Button></DialogTrigger>
                    <DialogContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                        <DialogTitle className='font-semibold text-[24px]'>HTML Email</DialogTitle>
                        <DialogDescription className='gap-4 flex flex-col'>
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
                                    <FormLabel className='text-[16px] font-semibold text-black'>Content</FormLabel>
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
                        </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button className='rounded-[4px] text-black bg-[#e3e3e36b] p-3 hover:bg-[#e3e3e3]'>Close</Button>
                            </DialogClose>
                            <DialogClose>
                                <Button type="submit" className='rounded-[4px] bg-[#1D1DCE] p-3 hover:bg-[#081A51]'>Add</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                    </Form>
                    </DialogContent>
                    </Dialog>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;