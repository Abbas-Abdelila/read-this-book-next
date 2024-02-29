import { ReloadIcon } from "@/lib/icons"
 
import { Button } from "@/components/ui/button"
 
export function ButtonLoading() {
  return (
    <Button className="bg-blue-600 hover:bg-blue-500 transition-transform duration-150 ease-in" disabled>
      <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
      Please wait
    </Button>
  )
}