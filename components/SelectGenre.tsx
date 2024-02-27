"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { BookSearchResult } from "@/types/types"
import axios from "axios"


const items = [
  {
    id: "fiction",
    label: "Fiction",
  },
  {
    id: "nonfiction",
    label: "Non-Fiction",
  },
  {
    id: "mystery",
    label: "Mystery",
  },
  {
    id: "thriller",
    label: "Thriller",
  },
  {
    id: "romance",
    label: "Romance",
  },
  {
    id: "fantasy",
    label: "Fantasy",
  },
  {
    id: "scienceFiction",
    label: "Science Fiction",
  },
  {
    id: "horror",
    label: "Horror",
  },
  {
    id: "youngAdult",
    label: "Young Adult",
  },
  {
    id: "children",
    label: "Children",
  },
  {
    id: "biography",
    label: "Biography",
  },
  {
    id: "history",
    label: "History",
  },
  {
    id: "poetry",
    label: "Poetry",
  },
  {
    id: "essays",
    label: "Essays",
  },
  {
    id: "selfHelp",
    label: "Self-Help",
  },
  {
    id: "business",
    label: "Business",
  },
  {
    id: "science",
    label: "Science",
  },
  {
    id: "technology",
    label: "Technology",
  },
  {
    id: "cooking",
    label: "Cooking",
  },
  {
    id: "travel",
    label: "Travel",
  },
] as const

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function SelectGenre( {selectedBooks, onSuggestionData } : { selectedBooks: BookSearchResult[], onSuggestionData: (data: any) => void}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios.post('/api/suggest', {
      books: selectedBooks,
      genres: data.items
    }).then((response) => {
      const { title, description } = response.data;
      onSuggestionData({ title, description }); 
  }).catch((error) => {
    console.error(error);
  });
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="grid gap-y-[6px] gap-x-3  p-10 grid-cols-2 lg:grid-cols-3 max-w-[768px] mx-auto  items-center">
             
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0 text-gray-800 "
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end p-5">
        <Button className="bg-blue-600 hover:bg-blue-500 transition-transform duration-150 ease-in" type="submit">Generate</Button>
        </div>
      </form>
    </Form>
  )
}
