import { ReloadIcon } from "@/lib/icons"
 
import { Button } from "@/components/ui/button"
 
export function ButtonLoading() {
  return (
    <Button size="sm" className="bg-blue-600 hover:bg-blue-500 transition-transform duration-150 ease-in" disabled>
      <ReloadIcon className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
      Generating...
    </Button>
  )
}